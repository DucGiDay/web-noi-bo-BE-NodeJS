const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const { hasAuthorization } = require('../middleware/has-authorization')

const Post = require('../controllers/post')
// @route GET api/posts
// @desc Get posts
// @access Private
router.get('/', verifyToken, hasAuthorization(["post:edit-all"]), Post.list)

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, hasAuthorization(["post:edit-all"]), Post.create)

// @route PUT api/posts
// @desc Update post
// @access Private
router.put('/:id', verifyToken, hasAuthorization(["post:edit-all"]), Post.update)

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, hasAuthorization(["post:edit-all"]), Post.delete)

router.param('id', Post.postById)

module.exports = router
