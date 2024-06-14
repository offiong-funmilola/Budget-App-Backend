const express = require('express')
const isAuth = require('../auth/is-auth')
const userController = require('../controllers/user')

const router = express.Router()

router.get('/user/:userId', isAuth, userController.getUser)
router.post('/record', isAuth, userController.createRecord)

module.exports = router