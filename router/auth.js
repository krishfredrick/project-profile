const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../middleware/authMiddleware')
const upload = multer({dest:'Upload'})


const {register, login, profile} = require('../controllers/auth')
// app.use()
router.post('/register', register);
// router.post('/login',auth,login);
router.post('/login',login);
// router.patch('/profile',auth,upload.single('profile'), profile)
router.patch('/profile',auth, profile)

module.exports = router