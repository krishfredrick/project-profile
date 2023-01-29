const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerSchema = new mongoose.Schema({
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
  }
})

registerSchema.pre('save', async function(){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

registerSchema.methods.createJWT = function(){
  const data = {
    userId : this._id,
    email: this.email,
  }

  return jwt.sign(
    data,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TIME,
    }
  )
}

registerSchema.methods.comparePassword = async function({canditatePassword}){
  const isMatch = await bcrypt.compare(canditatePassword,this.password)
  return isMatch
}


module.exports = mongoose.model('register', registerSchema)