const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ["active", "disabled"],
		required: true,
		default: "active"
	},
	phoneNumber: {
		type: String
	},
	email: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	roles: [{
    type: String
  }],
})

module.exports = mongoose.model('users', UserSchema)
