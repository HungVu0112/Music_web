const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  recent_play: 
    {
      type: [{
        song_name: { type: String },
        time_play: { type: Date },
      }],
      maxItems: 10,
    }
}, {
  timestamps: true,
});

// Add plugin

module.exports = mongoose.model('User', User, 'User')