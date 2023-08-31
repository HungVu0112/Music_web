const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Artist = new Schema({
  name: { type: String },
  image: { type: String },
});

// Add plugin

module.exports = mongoose.model('Artist', Artist, 'Artist');