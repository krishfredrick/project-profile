
// const { default: mongoose } = require('mongoose');
const monogoose = require('mongoose');

const connectDB = async(uri)=>{
  monogoose.set({'strictQuery': false}).connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('Mongoose db is connected')
  })
}

module.exports = connectDB