const express = require('express')
const authController = require('../controllers/auth')
const {check, body} = require('express-validator')
const User = require('../models/user')

const router = express.Router()

router.post('/signup', [
    check('email')
    .isEmail()
    .withMessage('Enter Valid Email')
    .custom((value, {req}) => {
        User.findOne({email: value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('E-mail address already exist')
            }
        })
    })
    ], 
    authController.createUser
)
router.post('/login', authController.loginUser)

module.exports = router