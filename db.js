
const monogoose = require('mongoose');

const connectDB = async(uri)=>{
  monogoose.set({'strictQuery': false}).connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB