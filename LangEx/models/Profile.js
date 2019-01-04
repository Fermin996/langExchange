const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  location:{
    type: String
  },
  intro:{
    type:String,
    required:false
  },
  occupation:{
    field:String,
    title:String
  },
  interests:{
        type:String,
        required:true
    },
  language:{
    type: String,
    required: false
  },
  language2:{
    type: String,
    required: false
  },
  country:String,  
  age: Number,
  school:String,
  gender:String
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);