const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now
	},
  createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	products: [{
    type: Schema.Types.ObjectId,
		ref: 'products'
  }],
  status: {
		type: String,
		enum: ["active", "disabled"],
		required: true,
		default: "active"
	},
})

module.exports = mongoose.model('categories', CategorySchema)