const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const JWT_SECRET = "moonRiver"

const protect = asyncHandler(async(req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{
      token = req.header.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      const user = await User.findById(decoded._id).select(['_id', 'name', 'email'])
      req.user = {...user}
      next()
    }catch(err){
      res.status(400)
      throw new Error('not auth')
    }
  }
  if(!token){
    res.status(401)
    throw new Error('not authorized, no token')
  }
})

module.exports = {
  protect
}