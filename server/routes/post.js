const express = require('express');
const router = express.Router();

const postController = require('../app/controller/PostController');

router.post('/createPost', postController.createPost)
router.get('/getAllPosts', postController.getAllPosts)
router.get('/deletePost/:userID&:playlistID', postController.deletePost)
router.get('/getSharedListByUserID/:userID', postController.getSharedListByUserID)
router.get('/addPostPlaylist/:userID&:playlistID&:user', postController.addPostPlaylist)
router.get('/deletePostPlaylist/:userID&:playlistID&:user', postController.deletePostPlaylist)

module.exports = router;