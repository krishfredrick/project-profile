// const registerSchema = require('../models/registerSchema')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../error')

const auth = async (req, res, next)=>{
  const authHeader = req.headers.authorization
  console.log(authHeader)
  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new UnauthenticatedError('Authentication invalid')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET,function(err, decoded){
      if(err){
        return res.json({
          success: "failed",
          message:'Failed to authenticate the token',
          error: err,
        })
      }
      console.log('success1')
      res.json(decoded);
    })
    console.log(payload, '<<< payload')
    console.log('success2')
    req.user = {
      userId: payload.userId, email: payload.email
    }
    console.log('success3')
   
    
    next()
  } catch (err) {
    // console.log(err)
    return res.status(500).json({
      message: "Internal server error",
      err

    })
    // throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth