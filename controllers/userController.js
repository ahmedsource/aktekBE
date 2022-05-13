const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET = "moonRiver"

const loginUser = asyncHandler(async(req, res)=>{
  const {email, password} = req.body
  if(!email, !password){
    res.status(400)
    throw new Error('missing fields')
  }
  const user = await User.findOne({email})
  console.log({user})
  if(user && bcrypt.compare(password, user.password)){
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id.valueOf())
    })
  }else{
    res.status(400)
    throw new Error('invalid logins')
  }
})
const registerUser = asyncHandler(async (req, res) => {
  const {email, name, password} = req.body
  // check if we have all nedded fields
  if(!email || !password || !name){
    throw new Error('mising fields')
  }
  // check if user already exists
  const userExists = await User.findOne({email})
  console.log({userExists})
  if(userExists){
    res.status(400)
    throw new Error('user already exists')
  }
  // hash password
  const salt  = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  // create
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  })
  if(newUser){
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      token: generateToken(newUser._id)
    })
  }else{
    res.status(400)
    throw new Error('invalid user data, can not create')
  }
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).res(req.user)
})

const generateToken = (id)=>{
  return jwt.sign({id},JWT_SECRET , {expiresIn: '30d'})
}

module.exports = {
  loginUser, registerUser, getMe
}