const {StatusCodes} = require('http-status-codes')
const validator = require('validator')
const registerSchema = require('../models/register')
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../error');




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
  console.log(req.session);
  req.session.isAuth = true;
    req.session.user = {
      username: registerSchema.username,
      email: registerSchema.email,
      userId: registerSchema._id,
    };
  console.log(user);
  res.status(StatusCodes.OK).json({
    user:{
      name:user.userName
    },
  })
  res.redirect('/profile');
}

const profile = async(req, res)=>{
  upload(req, res, (err) => {
    if (err) {
      res.render('profile', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('profile', {
          msg: 'Error: No File Selected!'
        });
      }
    }
  });




  const{state, country, collage, password, email, userName, name } = req.body;
  const user = await registerSchema.findOneAndUpdate(email ,{
    state,
    country,
    collage, 
    password,
    email,
    userName,
    name,
    profilePic: `/uploads/${req.file.filename}`,
  },{new: true}, (err, updated)=>{
    if (err) {
      res.render('dashboard', {
        msg: 'Error updating profile'
      });
    } else {
      res.render('dashboard', {
        msg: 'Profile updated successfully',
        data: updated
      });
    }

  })

  if(!user){
    throw new BadRequestError('Credentials are not filled')
  }

  res.status(StatusCodes.ACCEPTED).send({
    user:{user}
  })
}
module.exports={
  register, login, profile
}


// module.exports = register;