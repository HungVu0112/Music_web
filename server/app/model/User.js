const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./Song');
const Playlist = require('./Playlist');

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  recent_play: 
    {
      type: [{
        song: { type: Song.schema },
        time_play: { type: Date },
      }],
      maxItems: 10,
    },
  playlists: { type: [Playlist.schema] },
}, {
  timestamps: true,
});

// Add plugin

module.exports = mongoose.model('User', User, 'User')