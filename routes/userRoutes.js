const express = require('express')
const {loginUser, registerUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleWare/authMiddleWare')
const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)

module.exports = router