const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Incoming requests may have these headers and we allow them
app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});


app.post('/notes', (req, res, next) => {
  const note = req.body;
  console.log(note);
  res.status(201).json({
    message: 'Note created succesfully'
  })
});

app.get('/notes', (req, res, next) => {
  const notes = [
    {
      id: '11223',
      title: 'Title coming from server',
      description: 'Description coming from server'
    },
    {
      id: '42323',
      title: 'Second title coming from server',
      description: 'Second escription coming from server'
    }
  ]
  // Returning data in json format
  res.status(200).json({
    message: 'Notes fetched successfully',
    notes: notes
  });
});

module.exports = app;
