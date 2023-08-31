const User = require('../model/User');
const Post = require('../model/Post.js');
const ObjectId = require('mongodb').ObjectId;

class PostController {
    createPost(req, res, next) {
      const data = req.body;
      User.findOne({ email: data.email })
        .then(user => {
            user.playlists.forEach(playlist => {
                if (playlist._id.toString() === data.playlist._id) {
                    playlist.isShared = true;
                }
            })

            user.save();

            const post = new Post({
                user: {
                    username: user.username,
                    avatar: user.avatar,
                },
                desc: data.description,
                playlist: {
                    ...data.playlist,
                    userID: user._id,
                },
                likes: {
                    userID: [],
                    count: 0
                },
                tags: data.tags,
            })

            post.save();

            res.json("OK");
        })
        .catch(next)
    }

    deletePost(req, res, next) {
        const userID = new ObjectId(req.params.userID);
        User.findOne({ _id: userID })
            .then(user => {
                user.playlists.forEach(playlist => {
                    if (playlist._id.toString() === req.params.playlistID) {
                        playlist.isShared = false;
                    }
                })

                user.save();

                Post.deleteOne({ 'user.username': user.username, 'playlist._id': req.params.playlistID })
                    .then(post => {
                        res.json("deleted")
                    })

            })
            .catch(next)
    }

    getAllPosts(req, res, next) {
        Post.find()
            .then(posts => {
                res.json(posts)
            })
            .catch(next)
    }

    getSharedListByUserID(req, res, next) {
        Post.find({ 'playlist.userID': new ObjectId(req.params.userID) })
            .then(posts => {               
                const newArr = posts.map(post => {
                    return new Object({
                        playlist: post.playlist,
                        likes: post.likes.count
                    })
                })

                res.json(newArr);
            })
            .catch(next)
    }

    addPostPlaylist(req, res, next) {
        Post.findOne({ 'playlist.userID': new ObjectId(req.params.userID), 'playlist._id': req.params.playlistID })
            .then(post => {
                post.likes.count++;

                post.save();

                User.findOne({ _id:  new ObjectId(req.params.user)})
                    .then(user => {
                        user.favourite.playlists.push(post.playlist);
                        user.save();
                        res.json("Added");
                    })
            })
            .catch(next)
    }

    deletePostPlaylist(req, res, next) {
        Post.findOne({ 'playlist.userID': new ObjectId(req.params.userID), 'playlist._id': req.params.playlistID })
            .then(post => {
                post.likes.count--;

                post.save();

                User.findOne({ _id:  new ObjectId(req.params.user)})
                    .then(user => {
                        user.favourite.playlists = user.favourite.playlists.filter(item => {
                            if (item.name === post.playlist.name) {
                                return false;
                            } else {
                                return true;
                            }
                        });
                        user.save();
                        res.json("Deleted");
                    })
            })
    }
}

module.exports = new PostController;