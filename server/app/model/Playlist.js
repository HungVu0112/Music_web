const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./Song');

const Playlist = new Schema({
  name: { type: String },
  image: { type: String },
  songs: { type: [Song.schema] },
}
);

// Add plugin

module.exports = mongoose.model('Playlist', Playlist, 'Playlist');