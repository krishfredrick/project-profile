const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../error")

const errorHandlerMiddleware = async ( err,req, res, next)=>{

  const CustomError = {
    statusCode: err.statuscode,
    message: err.message,
  }

  // if(CustomError.error == )

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(CustomError);
}

module.exports = errorHandlerMiddleware