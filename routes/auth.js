const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')

const User = require('../controllers/auth')

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get('/user', verifyToken, User.getUser)

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', User.register)

router.post('/create', User.createUser)

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post('/login', User.login)

module.exports = router
