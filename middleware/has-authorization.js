const express = require('express')
const helper = require('../middleware/helper')
const _ = require('lodash')

const Post = require('../models/Post')

// exports.funcTest = (id) => {
//     console.log(id);
//   }

exports.hasAuthorization = function (roles) {
  // const _this = this
  return async function (req, res, next) {
  //   console.log('this', _this)
    const user = await helper.getUserById(req.userId)
    if (_.intersection(user.roles, roles).length) {
      return next()
    }
    return res.status(403).send({
      message: 'User is not authorized',
    })
  }
}