const mongoose = require('mongoose')
const LoginSchema = new mongoose.Schema({
  user: mongoose.SchemaTypes.ObjectId
},{
  timestamps: true
})

module.exports = mongoose.model('Login', LoginSchema)