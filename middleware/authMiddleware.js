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
  console.log('Token ...',token)
  try {
   jwt.verify(token, process.env.JWT_SECRET,function(err, decoded){
      if(err){
        return res.json({
          success: "failed",
          message:'Failed to authenticate the token',
          error: err,
        })
      }
      console.log('success1')
      console.log(decoded ,'<<< payload')
      req.user = {
        userId: decoded.userId, email: decoded.email
      }
      res.json(decoded);
    }
    )

    // payload is passing undefined
    
   
    
    next()
  } catch (err) {
    // console.log( ">>>>",{err})
    
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth