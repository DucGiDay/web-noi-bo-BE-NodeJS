const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Post = require('../controllers/post')
// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, Post.list)

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, Post.create)

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, Post.update)

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, Post.delete)

router.param('id', Post.postById)

module.exports = router
