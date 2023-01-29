require('dotenv').config()
require('express-async-errors')
const express = require('express');
const { default: helmet } = require('helmet');
// const session = require('session')
// const mongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

/** LOCAL FILE */
const connectDB = require('./db');
const authRouter = require('./router/auth');
const errorHandlerMiddleware = require('./middleware/err-handler');
const NotFoundErrorMiddleware = require('./middleware/not-found');

// const { collection } = require('./models/register');

const app = express();

/** SYSTEM MIDDLEWARE */
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(cors())

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

/**LOCAL MIDDLEWARE */



/** SESSION STORAGE */
// const store = new mongoDBSession({
//   uri: process.env.DB_TOKEN,
//   collection: 'session'
// })

// app.use(session({
//   secret:process.env.SESSION_SECRET,
//   resave: false, 
//   saveUninitialized: false,
//   store,
// }))

/** ROUTE */
app.use('/api/v1/auth', authRouter)

app.use(errorHandlerMiddleware)
app.use(NotFoundErrorMiddleware)
const port = process.env.PORT;
const start = async()=>{
  try {
    await connectDB(process.env.DB_TOKEN)
    app.listen(port,()=>{
      console.log('Server is running')
      console.log(`http://localhost:${port}`)
    })
  } catch (err) {
    console.log(">>>",err)
  }
}
start()