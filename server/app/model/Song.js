const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Song = new Schema({
  name: { type: String },
  likes: { type: Number },
  artist_name: { type: String },
  image: { type: String },
  sound: { type: String },
  type: { type: String },
});

// Add plugin

module.exports = mongoose.model('Song', Song, 'Song')