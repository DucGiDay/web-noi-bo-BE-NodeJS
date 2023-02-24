const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const { hasAuthorization } = require('../middleware/has-authorization')

const User = require('../controllers/auth')

router.get('/user', verifyToken, User.getUser)

router.get('/users', verifyToken, hasAuthorization(["admin"]), User.getAllUsers)
router.post('/create',verifyToken, hasAuthorization(["admin"]), User.createUser)
router.put('/users', verifyToken, hasAuthorization(["admin"]), User.deleteUsers)

router.post('/register', User.register)
router.post('/login', User.login)

router.param('id', User.userById)

module.exports = router
