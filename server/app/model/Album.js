const mongoose = require('mongoose');
const Song = require('./Song');
const Schema = mongoose.Schema;

const Album = new Schema({
  name: { type: String },
  image: { type: String },
  artist: { type: String },
  songs : { type: [Song.schema] },
});

// Add plugin

module.exports = mongoose.model('Album', Album, 'Album');