const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')

const Artist = new Schema({
  name: { type: String }
});

// Add plugin

module.exports = mongoose.model('Artist', Artist, 'Artist')