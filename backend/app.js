const express = require('express');
const { stringify } = require('querystring');
const app = express();


app.use('/notes', (req, res, next) => {
  const post = {
    title: string, 
    content: string
  }
  // Returning data in json format
  res.json(post);
});

module.exports = app;
