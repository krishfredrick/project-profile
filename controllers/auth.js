const {StatusCodes} = require('http-status-codes')
const registerSchema = require('../models/registerSchema')
const { NotFoundError, BadRequestError, UnauthenticatedError } = require('../error');

/** REGISER */
const register = async(req, res)=>{

  /** 
   * 1.create the user
   * 2.validate the user
   */
  const user = await registerSchema.create({...req.body})
  
  // const token = await user.createJWT()
  console.log(user)
  if(!user){
    throw NotFoundError('Please provide every credentials')
  }
  res.status(StatusCodes.MOVED_TEMPORARILY).json({messge:' Registery SuccessFul !!!',user }).redirect('/login')
}


/** LOGIN */

const login = async(req,res)=>{
  
  /** 
   * 1.Getting Id, password
   * 2.getting the Data from database using findOne {email, userName}
   * 3.compareing the Password
   * 4.invoking the Session
   * 5.redirecting to the profile route
   */
  console.log(req.body)
  const {loginId, password} = req.body;

  if(!loginId || ! password){
    throw new BadRequestError('please provide email and password')
  }

  let user = await registerSchema.findOne({ $or:[{email:loginId}, {userName: loginId}]})

  const token = await user.createJWT()
  if(!user){
    throw new UnauthenticatedError("Invalid Credentials")
  }
  
  const isMatch = await user.comparePassword({password});
  if(!isMatch){
    throw UnauthenticatedError('Your credentials Miss Match ..!')
  }
  console.log(req.session);
  req.session.isAuth = true;
    req.session.user = {
      username: user.userName,
      email: user.email,
      userId: user._id,
      token,
    };
  console.log(user.userName);
  res.status(StatusCodes.OK).json({
    user:{
      name:user.userName
    },
    user:{user},token
  })
  // res.redirect('/profile');
}

/** PROFILE */
const profile = async(req, res)=>{

  /**
   * 1.create theupload file path
   */

  // Uploading picture doubt of the code 
  /*upload(req, res, (err) => {
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
  */




  const{state, country, collage, password, email, userName, name,  } = req.body;
  console.log(req.body)
  const user = await registerSchema.findOneAndUpdate(email ,{
    state,
    country,
    collage, 
    password,
    email,
    userName,
    name,
    // profilePic: `/uploads/${req.file.filename}`,
  },{new: true}, 

  // Doubt of this code working need to debug in future
  /*
  (err, updated)=>{
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

  }
  */
  )

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

