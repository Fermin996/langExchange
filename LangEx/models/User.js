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
    default: "https://www.euc.ac.cy/images/media/imageoriginal/icon-user-default.png"
  },
  language:{
    type: String,
    required: true
  }
  ,
  language2:{
    type: String,
    required: true
  },
  country:String,
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ]
})

module.exports = User = mongoose.model('user', UserSchema);