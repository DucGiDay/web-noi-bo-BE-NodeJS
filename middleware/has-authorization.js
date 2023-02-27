const express = require('express')
const helper = require('../middleware/helper')
const _ = require('lodash')


exports.hasAuthorization = function (roles) {
  return async function (req, res, next) {

    //Kiểm tra người dùng có roles tương ứng hay không
    const user = await helper.getUserById(req.userId)
    
    if (_.intersection(user.roles, roles).length) {
      return next()
    }

    return res.status(403).send({
      message: 'User is not authorized',
    })
  }
}