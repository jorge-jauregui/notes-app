const express = require('express');
const { stringify } = require('querystring');
const app = express();


app.use('/notes', (req, res, next) => {
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
    message: 'Posts fetched successfully',
    notes: notes
  });
});

module.exports = app;
