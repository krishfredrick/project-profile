const express = require('express')
const router = express.Router()
// const auth = require('../middleware/authMiddleware')

const {register, login} = require('../controllers/auth')

router.post('/register', register);
router.post('/login',login);

module.exports = router