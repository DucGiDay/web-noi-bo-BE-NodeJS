const _ = require('lodash')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId

getObjectId = (exports.getObjectId = function (obj) {
  const id = _.get(obj, '_id') || obj
  if (_.isString(id) && ObjectId.isValid(id)) return new ObjectId(id)
  return id
})

// exports.isEqual = function (a, b) {
//   return _.isEqual(getObjectId(a), getObjectId(b))
// }

//Lấy toàn bộ thông tin 1 người dùng thông qua ObjID
exports.getUserById = async function (ObjId) {
  try {
		const user = await User.findById(ObjId).select('-password')

		if (!user)
			return console.log('User not found' )

    return user
	} catch (error) {
		console.log(error)
	}
}