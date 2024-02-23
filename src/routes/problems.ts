import { DocumentSnapshot } from "firebase-admin/firestore";
import { Request, Response } from 'express';
// const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const _express = require("express");
const router = _express.Router();
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const db = getFirestore();

const slugs = [
  "top-interview-150-1-yf91",
  "top-interview-150-2-o7jr",
]

const categories = [
  {
    "name": "Array and String",
    "slug": "array-and-string"
  },
  {
    "name": "Two Pointers",
    "slug": "two-pointers"
  }
]

const questionsGroup = [
  {
    "slug": "top-interview-150-1-yf91",
    "questions": [
      {
        "titleSlug": "merge-sorted-array",
        "status": "TO_DO"
      },
      {
        "titleSlug": "remove-element",
        "status": "TO_DO"
      }
    ]
  },
  {
    "slug": "top-interview-150-2-o7jr",
    "questions": [
      {
        "titleSlug": "valid-palindrome",
        "status": "TO_DO"
      },
      {
        "titleSlug": "is-subsequence",
        "status": "TO_DO"
      }
    ]
  }
]

// type ToFrontend = {
//   id: string,
//   name: "Two sum",
//   slug: "two-sum",
//   source: [
//     {
//       id: string,
//       name: "Leetcode 75",
//       slug: "leetcode-75",
//       createdAt: "",
//     },
//   ],
//   category: {
//     id: string,
//     name: "Array and Hash",
//     slug: "array-and-hash",
//     createdAt: "",
//   },
//   difficulty: {
//     id: string,
//     name: "Easy",
//     slug: "easy",
//     createdAt: "",
//   },
//   createdAt: "",
// }

router.get('/test', async (req: Request, res: Response) => {
  try {
    const docRef = db.collection('test').doc('test');
    const docSnapshot = await docRef.get()
    const { createTime, exists, id, ref, updateTime } = docSnapshot
    const data = docSnapshot.data()

    return res.status(200).json({
      data,
      snapshotStatic: {
        createTime: createTime.toMillis(),
        exists,
        id,
        refID: ref.id,
        refPath: ref.path,
        updateTime: updateTime.toMillis()
      }
    });
  } catch (error) {
    console.error('Error adding test:', error);
    return res.status(404).json('Error adding test:' + error);
  }
});

router.post('/test', async (req: Request, res: Response) => {
  try {
    const docRef = db.collection('test').doc('test');
    const writeResult = await docRef.set({
      question1: {
        name: "asd",
        val: 123
      },
      question2: {
        name: "asd",
        val: 123
      },
    }, { merge: true })

    return res.status(200).json(`create at ${writeResult.writeTime.toDate()}`);
  } catch (error) {
    console.error('Error adding test:', error);
    return res.status(404).json('Error adding test:' + error);
  }
});

router.put('/test/:field', async (req: Request, res: Response) => {
  try {
    const { field } = req.params
    const collectionRef = db.collection('test');
    const docRef = collectionRef.doc('test');
    const snapshot = await docRef.get();

    const existingData = snapshot.data();

    if (existingData && existingData[field]) {
      existingData[field].val = "newStatus";
      await docRef.set(existingData);
    }

    return res.status(200).json('success');
  } catch (error) {
    console.error('Error adding test:', error);
    return res.status(404).json('Error adding test:' + error);
  }
});

router.get('/collections/:name', async (req: Request, res: Response) => {
  const name = req.params.name

  const snapshot = await db.collection(name).get();

  const result: any[] = []

  snapshot.forEach((doc: any) => {
    const { createTime, name, slug } = doc.data()
    result.push({
      id: doc.id,
      data: {
        name,
        slug,
        createTime: createTime.toMillis()
      }
    })
  });

  return res.status(200).json(result);
});

router.get('/questionsGroup', async (req: Request, res: Response) => {
  try {
    const categoriesDocSnapshot = await db.collection('categories').get()
    const questionsDocSnapshot = await db.collection('questions').get()
    const questionGroupDocSnapshot = await db.collection('data').doc('questionsGroup').get()

    const result: any[] = []
    const categoriesRes: Record<string, { name: string, slug: string }> = {}
    const questionsRes: Record<string, {
      name: string,
      status: string,
      titleSlug: string
    }[]> = {}

    categoriesDocSnapshot.forEach((snapshot: DocumentSnapshot) => {
      categoriesRes[snapshot.id] = {
        name: snapshot.get('name'),
        slug: snapshot.get('slug')
      }
    })

    questionsDocSnapshot.forEach((snapshot: DocumentSnapshot) => {
      const categoryId = snapshot.get('belongTo')

      if (questionsRes[categoryId]) {
        questionsRes[categoryId].push({
          name: snapshot.get('name'),
          status: snapshot.get('status'),
          titleSlug: snapshot.get('titleSlug')
        })
      } else {
        questionsRes[categoryId] = [{
          name: snapshot.get('name'),
          status: snapshot.get('status'),
          titleSlug: snapshot.get('titleSlug')
        }]
      }
    })

    questionGroupDocSnapshot.data().data.forEach((group: { categoryId: string, questions: string[] }) => {
      result.push({
        title: categoriesRes[group.categoryId],
        questions: questionsRes[group.categoryId]
      })
    })

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error adding test:', error);
    return res.status(404).json('Error adding test:' + error);
  }
});

router.post('/questionsGroup', async (req: Request, res: Response) => {
  const categoriesBatch = db.batch();
  const categoriesRef = db.collection('categories');

  categories.forEach((category, index) => {
    const { name, slug } = category
    const leetcodeSlug = slugs[index]

    categoriesBatch.set(categoriesRef.doc(slug), {
      name,
      slug,
      leetcodeSlug,
      createTime: FieldValue.serverTimestamp(),
    }, { merge: true });
  });

  try {
    await categoriesBatch.commit()
    console.log('Categories added successfully.');
  } catch (error) {
    console.error('Error adding categories:', error);
    return res.status(404).json('Error adding categories:' + error);
  }

  const questionsBatch = db.batch();
  const questionsGroupBatch = db.batch();
  const questionsGroupRef = db.collection('data').doc('questionsGroup');
  const questionGroupData: { categoryId: string, questionSlugs: string[] }[] = []

  // Iterate through questionsGroup and add them to the batch
  for (let index = 0; index < questionsGroup.length; index++) {
    try {
      // Fetch the category document
      const subgroup = questionsGroup[index];
      const categoriesDocRef = categoriesRef.where('leetcodeSlug', '==', subgroup.slug).limit(1);
      const categoriesSnapshot = await categoriesDocRef.get()

      if (categoriesSnapshot.empty) return res.status(404).json('category doesnt exist');

      const categoryId = categoriesSnapshot.docs[0].id;
      const questionSlugs: string[] = []

      // add questions to batch
      subgroup.questions.forEach((question) => {
        const { titleSlug, status } = question
        const questionRef = db.collection('questions').doc(titleSlug);

        questionsBatch.set(questionRef, {
          name: titleSlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          titleSlug,
          status,
          belongTo: categoryId,
          createTime: FieldValue.serverTimestamp(),
        }, { merge: true });

        questionSlugs.push(titleSlug);
      })

      questionGroupData.push({
        categoryId,
        questionSlugs
      })
    } catch (error) {
      console.error('Error fetching category:', error);
      return res.status(404).json('Error fetching category:' + error);
    }
  }

  try {
    await questionsBatch.commit()
  } catch (error) {
    console.error('Error updating questions:', error);
    return res.status(404).json('Error updating questions:' + error);
  }

  questionsGroupBatch.set(questionsGroupRef, { data: questionGroupData });

  // Commit the batch to update questionsGroup
  try {
    await questionsGroupBatch.commit()
    console.log('questionsGroup updated successfully.');
  } catch (error) {
    console.error('Error updating questionsGroup:', error);
    return res.status(404).json('Error updating questionsGroup:' + error);
  }

  return res.status(200).json('create a problem');
});

router.delete('/problem', async (req: Request, res: Response) => {
  // Replace 'categories', 'questionsGroup', 'questions' with your collection names
  const collectionsToDelete = ['categories', 'questionsGroup', 'questions'];

  async function deleteCollections() {
    try {
      for (const collectionName of collectionsToDelete) {
        console.log(`Deleting collection: ${collectionName}`);
        await deleteCollection(db, collectionName, collectionsToDelete.length); // Adjust the batch size if needed
        console.log(`Collection ${collectionName} deleted successfully.`);
      }
    } catch (error) {
      console.error('Error deleting collections:', error);
    } finally {
      // Close Firestore connection after deleting collections
      // admin.app().delete();
    }
  }

  async function deleteCollection(db: any, collectionPath: any, batchSize: any) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }

  async function deleteQueryBatch(db: any, query: any, resolve: any) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, resolve);
    });
  }

  // Call the function to delete collections
  await deleteCollections();

  return res.status(200).json("delete all");
});

router.get('/options', async (req: Request, res: Response) => {
  return res.status(200).json([
    {
      heading: "Category",
      options: [
        { label: "All Categories", value: "allCategories" },
        { label: "Array and Hash", value: "1" },
        { label: "Tree", value: "2" },
        { label: "Graph", value: "3" },
      ]
    },
    {
      heading: "Difficulty",
      options: [
        { label: "All Difficulties", value: "allDifficulties" },
        { label: "Easy", value: "4" },
        { label: "Medium", value: "5" },
        { label: "Hard", value: "6" },
      ]
    },
    {
      heading: "Problem",
      options: [
        { label: "All Problems", value: "allProblems" },
        { label: "leetcode 75", value: "7" },
        { label: "leetcode 150", value: "8" },
        { label: "neetcode 75", value: "9" },
        { label: "neetcode 150", value: "10" },
      ]
    },
  ]);
});

module.exports = router;