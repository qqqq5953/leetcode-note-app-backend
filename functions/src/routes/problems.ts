const _express = require("express");
const router = _express.Router();
const { getFirestore } = require("firebase-admin/firestore");
// const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { v4: uuidv4 } = require('uuid');

router.get('/problems', (_req: any, res: any) => {
  return res.status(200).json([
    {
      heading: "Array and Hash",
      options: [
        {
          id: uuidv4(),
          name: "Two sum",
          slug: "two-sum",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 75",
              slug: "leetcode-75",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Array and Hash",
            slug: "array-and-hash",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Easy",
            slug: "easy",
            createdAt: "",
          },
          createdAt: "",
        },
        {
          id: uuidv4(),
          name: "Merge sorted array",
          slug: "merge-sorted-array",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 75",
              slug: "leetcode-75",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Array and Hash",
            slug: "array-and-hash",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Easy",
            slug: "easy",
            createdAt: "",
          },
          createdAt: "",
        }
      ]
    },
    {
      heading: "Tree",
      options: [
        {
          id: uuidv4(),
          name: "Tree1",
          slug: "tree1",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 75",
              slug: "leetcode-75",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Tree",
            slug: "tree",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Medium",
            slug: "medium",
            createdAt: "",
          },
          createdAt: "",
        },
        {
          id: uuidv4(),
          name: "Tree2",
          slug: "tree2",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 75",
              slug: "leetcode-75",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Tree",
            slug: "tree",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Medium",
            slug: "medium",
            createdAt: "",
          },
          createdAt: "",
        }
      ]
    },
    {
      heading: "Graph",
      options: [
        {
          id: uuidv4(),
          name: "Graph1",
          slug: "graph1",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 150",
              slug: "leetcode-150",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Graph",
            slug: "graph",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Hard",
            slug: "hard",
            createdAt: "",
          },
          createdAt: "",
        },
        {
          id: uuidv4(),
          name: "Graph2",
          slug: "graph2",
          source: [
            {
              id: uuidv4(),
              name: "Leetcode 150",
              slug: "leetcode-150",
              createdAt: "",
            },
          ],
          category: {
            id: uuidv4(),
            name: "Graph",
            slug: "graph",
            createdAt: "",
          },
          difficulty: {
            id: uuidv4(),
            name: "Hard",
            slug: "hard",
            createdAt: "",
          },
          createdAt: "",
        }
      ]
    },
  ]);
});

router.get('/problem/:id', (_req: any, res: any) => {
  // const id = req.params.id
  return res.status(200).json({
    id: uuidv4(),
    name: "Two sum",
    slug: "two-sum",
    description: "<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class=\"example\">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class=\"example\">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face=\"monospace\">&nbsp;</font>time complexity?",
    contentSelf: "```js\nfunction removeDuplicates(arr) {\n  let unique = [];\n  arr.forEach(item => {\n    if(!unique.includes(item)) {\n      unique.push(item);\n    }\n  });\n  return unique; \n}\n\n// Example usage:\nlet arr = [1, 2, 3, 1, 5, 6, 2, 5, 7];\nlet uniqueArr = removeDuplicates(arr); \nconsole.log(uniqueArr); // [1, 2, 3, 5, 6, 7]\n```\n\nTo explain:\n\n- Create an empty array `unique` to store unique values\n- Loop through the input array with `.forEach` \n- For each item, check if `unique` already `.includes()` that item \n- If not, `.push()` that item into `unique`\n- After the loop, `",
    contentTime: "```js\nfunction removeDuplicates(arr) {\n  let unique = [];\n  arr.forEach(item => {\n    if(!unique.includes(item)) {\n      unique.push(item);\n    }\n  });\n  return unique; \n}\n\n// Example usage:\nlet arr = [1, 2, 3, 1, 5, 6, 2, 5, 7];\nlet uniqueArr = removeDuplicates(arr); \nconsole.log(uniqueArr); // [1, 2, 3, 5, 6, 7]\n```\n\nTo explain:\n\n- Create an empty array `unique` to store unique values\n- Loop through the input array with `.forEach` \n- For each item, check if `unique` already `.includes()` that item \n- If not, `.push()` that item into `unique`\n- After the loop, `",
    contentSpace: "```js\nfunction removeDuplicates(arr) {\n  let unique = [];\n  arr.forEach(item => {\n    if(!unique.includes(item)) {\n      unique.push(item);\n    }\n  });\n  return unique; \n}\n\n// Example usage:\nlet arr = [1, 2, 3, 1, 5, 6, 2, 5, 7];\nlet uniqueArr = removeDuplicates(arr); \nconsole.log(uniqueArr); // [1, 2, 3, 5, 6, 7]\n```\n\nTo explain:\n\n- Create an empty array `unique` to store unique values\n- Loop through the input array with `.forEach` \n- For each item, check if `unique` already `.includes()` that item \n- If not, `.push()` that item into `unique`\n- After the loop, `",
    source: [
      {
        id: uuidv4(),
        name: "Leetcode 75",
        slug: "leetcode-75",
        createdAt: "",
      },
    ],
    category: {
      id: uuidv4(),
      name: "Array and Hash",
      slug: "array-and-hash",
      createdAt: "",
    },
    difficulty: {
      id: uuidv4(),
      name: "Easy",
      slug: "easy",
      createdAt: "",
    },
    createdAt: "",
  });
});

router.get('/options', async (req: any, res: any) => {
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

router.post('/problem/:id', async (req: any, res: any) => {
  const id = req.params.id
  const writeResult = await getFirestore()
    .collection("messages")
    .add({ original: id });
  return res.status(200).json('create a problem:' + writeResult.id);
});

module.exports = router;