const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Song = new Schema({
  name: { type: String },
  artist_name: { type: String },
  image: { type: String },
  sound: { type: String },
});

// Add plugin

module.exports = mongoose.model('Song', Song, 'Song')