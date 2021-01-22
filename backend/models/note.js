const mongoose = require('mongoose');

// Defining note schema
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

// Creating model objects based on the previous note schema definition
module.exports = mongoose.model('Note', noteSchema);
