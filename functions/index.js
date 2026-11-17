
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks')

const app = express();

app.use(cors({origin: true })); 

app.use(express.json()); 
app.use('/tasks', tasksRouter);

exports.app = app;
exports.api = functions.https.onRequest(app); 