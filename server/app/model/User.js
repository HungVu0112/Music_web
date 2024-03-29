const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('./Song');
const Artist = require('./Artist');
const Playlist = require('./Playlist');

const PlaylistAddition = Playlist.schema.clone();

PlaylistAddition.add({
  isShared: { type: Boolean, default: false },
  userID: { type: String },
});

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  recent: 
    {
      type: {
        songs: {type: [Song.schema]},
        artists: {type: [Artist.schema]},
        playlists: {type: [Playlist.schema]},
      },
    },
  favourite: {
    type: {
      songs: {type: [Song.schema]},
      artists: {type: [Artist.schema]},
      playlists: {type: [Object]},
    },
  },
  playlists: { type: [PlaylistAddition] },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', User, 'User')