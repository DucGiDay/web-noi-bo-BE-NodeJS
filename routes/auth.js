const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const { hasAuthorization } = require('../middleware/has-authorization')

const User = require('../controllers/auth')

// @desc Check if user is logged in
// @access Public
router.get('/user', verifyToken, User.getUser)

// @desc Register user
// @access Public
router.post('/register', User.register)

// @desc Create user
// @access Private
router.post('/create',verifyToken, hasAuthorization(["admin"]), User.createUser)

// @desc Login user
// @access Public
router.post('/login', User.login)

module.exports = router
