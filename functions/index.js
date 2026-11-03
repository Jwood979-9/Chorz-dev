const functions = require('firebase-functions');
const functions = require('express');
const functions = require('cors');

const app = express();

app.use(cors({orgin: true })); 

app.use(express.json()); 



exports.api = functions.https.onRequest(app); 