const {StatusCodes} = require('http-status-codes')
const validator = require('validator')
const registerSchema = require('../models/register')
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../error')


const register = async(req, res)=>{
  let email = req.body.email
  userExits = await registerSchema.findOne({ email });
  if (userExits) {
    return res.send({
      status: 403,
      message: "User already exists",
    });
  }
  const user = await registerSchema.create({...req.body})
  const token = await user.createJWT()
  if(!user){
    throw NotFoundError('Please provide every credentials')
  }
  console.log(token)
  res.status(StatusCodes.MOVED_TEMPORARILY).json({messge:' Registery SuccessFul !!!',user:{name:user.userName}, token}).redirect('/login')
}


/** LOGIN */

const login = async(req,res)=>{
  const {loginId, password} = req.body;
  console.log(req.body);
  if(!loginId || ! password){
    throw new BadRequestError('please provide email and password')
  }
  let user
  if(validator.isEmail(loginId)){
    user = await registerSchema.findOne({email:loginId})
    
  }else{
    user = await registerSchema.findOne({userName:loginId})
    
  }
  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")
  }
  
  const isMatch = await registerSchema.comparePassword({password});
  if(!isMatch){
    throw UnauthenticatedError('Your credentials Miss Match ..!')
  }
  // console.log(req.session);
  // req.session.isAuth = true;
  //   req.session.user = {
  //     username: registerSchema.username,
  //     email: registerSchema.email,
  //     userId: registerSchema._id,
  //   };
  console.log(user);
  res.status(StatusCodes.OK).json({
    user:{
      name:user.userName
    },
  })
  res.redirect('/dashboard');
}

module.exports={
  register, login
}


// module.exports = register;