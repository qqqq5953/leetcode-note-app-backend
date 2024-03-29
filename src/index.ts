require('dotenv-flow').config();

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { onRequest } = require("firebase-functions/v2/https");

// The Firebase Admin SDK to access Firestore.
const { initializeApp, cert } = require('firebase-admin/app');

const isLocal = process.env.NODE_ENV === 'development';

if (isLocal) {
  const serviceAccount = {
    "project_id": process.env.FB_PROJECT_ID,
    "private_key": process.env.FB_PRIVATE_KEY?.replace(/\\n|\\/g, "\n"),
    "client_email": process.env.FB_CLIENT_EMAIL,
  };

  initializeApp({ credential: cert(serviceAccount) });
} else {
  initializeApp();
}

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const compression = require("compression");
const cors = require("cors");
const logger = require('morgan')
const path = require('path')

const express = require("express");
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST']
  }) // { origin: true }
)

app.all('*', function (_req: any, res: any, next: any) {
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:5000'
  )
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

const problemsRoute = require('./routes/problems');
app.use('/', problemsRoute);


if (isLocal) {
  const port = process.env.PORT || 3000;

  app.set('port', port)
  app.listen(port, () => {
    console.log(`Server is fired at http://localhost:${port}`);
  });
  module.exports = app
}


// leetcode1 will be the name of the function as well as API
//in which we will pass our express app
exports.leetcode = onRequest({ timeoutSeconds: 1200, region: ["asia-east1"], cors: true }, app);