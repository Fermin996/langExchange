const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    default: "https://cdn2.vectorstock.com/i/1000x1000/19/01/user-icon-male-person-symbol-profile-avatar-sign-vector-18991901.jpg"
  }
})

module.exports = User = mongoose.model('user', UserSchema);