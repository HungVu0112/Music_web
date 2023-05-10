const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AboutUs = new Schema({
  name: { type: String },
  image: { type: String },
});

// Add plugin

module.exports = mongoose.model('AboutUs', AboutUs, 'AboutUs')