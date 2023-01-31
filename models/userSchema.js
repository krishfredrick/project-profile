const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{
    type: String,
    required: [true, 'please provide name it is mandatory'],
    minlength: 3, 
    maxlength: 50,

  },
  userName:{
    type: String,
    required: [true, 'please provide userName it is mandatory'],
    minlength: 3, 
    maxlength: 50,
    unique:true, 
  },
  email:{
    type: String,
    required: [true, 'please Provide Email it is mandatory'],
    unique: true, 
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email'
    ]
  },
  password:{
    type: String,
    minlength: 6,
    required:[true, 'Enter your password']
  },
  phoneNumber:{
    type: Number,
    required:[true, 'Enter your Phone Number']
  }, 
  profile: String,
})


module.exports = mongoose.model("Users", userSchema);