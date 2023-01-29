
const NotFoundErrorMiddleware = (req, res)=>{
  res.status(404).send( 'content Not Found ..!!!')
}

module.exports = NotFoundErrorMiddleware;