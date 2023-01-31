const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../error")

const errorHandlerMiddleware = async ( err,req, res, next)=>{

  const CustomError = {
    statusCode: err.statuscode ||StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong server side (ㆆ_ㆆ)',
  }

  // if(CustomError.error == )

  res.status(CustomError.statusCode).send(CustomError.message);
}

module.exports = errorHandlerMiddleware