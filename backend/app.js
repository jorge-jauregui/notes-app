const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Note = require('./models/note');
const srvAddress = require('./secrets');

const app = express();


mongoose.connect(srvAddress)
  .then(() => {
    console.log('Connected to database.')
  })
  .catch(() => {
    console.log('Connection unsuccessful.')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Incoming requests may have these headers and we allow them
app.use('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.post('/notes', (req, res, next) => {
  // The mongoose model method provides a constructor function for a new javascript object.
  const note = new Note({
    title: req.body.title,
    description: req.body.description
  });
  // Save method from mongoose
  // We send the client the id of the new note
  note.save().then(newNote => {
    res.status(201).json({
      message: 'Note created succesfully',
      noteId: newNote._id
    });
  });
});

app.patch('/notes/:id', (req, res, next) => {
  const note = new Note({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description
  });
  Note.updateOne({ _id: req.params.id}, note).then(result => {
    res.status(200).json({message: 'Note updated successfully.'});
  });
});

app.get('/notes', (req, res, next) => {
  // Find method from mongoose
  Note.find()
    .then(dbDocs => {
      // Returning data in json format
      res.status(200).json({
        message: 'Notes fetched successfully',
        notes: dbDocs
      });
    });
});

app.get('/notes/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if(note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({message: 'Note not found'})
    }
  })
})

app.delete('/notes/:id', (req, res, next) => {

  // On deleteOne() we pass in a property from express that gives access to all encoded parameters (id in this case)
  Note.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Post deleted!'
      });
    });

});

module.exports = app;
