const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  SKU: {
    type: String,
    required: true,
    unique: true
  },
	createdAt: {
		type: Date,
		default: Date.now
	},
  createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	category: {
    type: Schema.Types.ObjectId,
		ref: 'categories'
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
		type: String,
		enum: ["active", "disabled"],
		required: true,
		default: "active"
	},
})

module.exports = mongoose.model('products', ProductSchema)