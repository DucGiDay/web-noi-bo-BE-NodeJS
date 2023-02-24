const express = require('express')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const User = require('../models/User')
const helper = require('../middleware/helper')

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json({ success: true, data: users })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

exports.deleteUsers = async (req, res) => {
	let users = req.body
	let userIds = []
	_.forEach(users, (user) => {
		userIds.push(helper.getObjectId(user))
	})
	try {
		users = await User.find({_id: {$in: userIds}})
		_.forEach(users, (user) => {
			user.status = "disabled"
			user.save()
		})
		return res.json({ success: true, data: users })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

exports.register = async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword, roles: ["user"] })
		await newUser.save()

		// Return token
		// const accessToken = jwt.sign(
		// 	{ userId: newUser._id },
		// 	process.env.ACCESS_TOKEN_SECRET
		// )

		res.json({
			success: true,
			message: 'User created successfully',
			// accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}


exports.createUser = async (req, res) => {
	const { username, password, roles } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })

		if (user)
			return res
				.status(400)
				.json({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, password: hashedPassword, roles })
		await newUser.save()


		res.json({
			success: true,
			message: 'User created successfully',
			// accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

exports.login = async (req, res) => {
	const { username, password } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username and/or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username, status: "active" })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

exports.userById = async (req, res, next, id) => {
	User.findById(id)
	.exec(function (err, user) {
		if (err) return next(err)
		if (!user) return next(new Error('Failed to load user ' + id))
		req.user = user
		next()
	})
}
