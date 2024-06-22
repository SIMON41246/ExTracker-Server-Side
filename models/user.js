const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const confiq=require('config')
const salt=10;
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 156
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 156
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 156
  }
})
userSchema.methods.generateAuthtoken = function () {
  const token = jwt.sign({ _id: this._id },"Productions");
  return token;
}

const User = mongoose.model('User', userSchema)

exports.User = User