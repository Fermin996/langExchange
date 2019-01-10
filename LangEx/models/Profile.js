const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  intro:{
    type:String,
    required:false
  },
  occupation:{
    type:String
  },
  interests:{
        type:String,
        required:true
    },
  age: Number
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);