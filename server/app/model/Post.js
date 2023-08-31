const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Playlist = require('./Playlist');

const Post = new Schema({
    user: { type: {
        username: { type: String },
        avatar: { type: String }
    } },
    desc: { type: String },
    playlist: { type: Object },
    likes: { type: {
        userID: { type: [String] },
        count: { type: Number }
    } },
    tags: { type: String }
},{
    timestamps: true,
}
);

module.exports = mongoose.model('Post', Post, 'Post');