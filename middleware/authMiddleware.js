const registerSchema = require('../models/register')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../error')

const auth = async (req, res, next)=>{
  console.log(req.headers)
  const authHeader = req.headers.Authorization
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
      res.json(decoded);
    })
    req.user = {
      userId: payload.userId, email: payload.email
    }
    console.log( '>>>',payload )
    next()
  } catch (err) {
    console.log(err)
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth