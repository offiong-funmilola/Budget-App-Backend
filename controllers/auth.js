const User = require('../models/user')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = new Error('Email already exist')
            error.statusCode = 422
            throw error
    }
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({name: name, email: email, password: hashedPassword})
        return user.save()
    })
    .then(user => {
        res.status(201).json({message:'User Created Successfully', user: user})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })    
}

exports.loginUser = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let confirmedUser
    User.findOne({email: email})
    .then(user => {
        if(!user){
            const error = new Error('user not found')
            error.statusCode = 404
            throw error
        }
        confirmedUser = user
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if(!isEqual){
            const error = new Error('')
        }
        const token = jwt.sign(
            {email: email, userId: confirmedUser._id.toString()},
            'secretofconfirmedusersecretquestionforbudgetapp', {expiresIn: '1h'}
            )
        res.status(200).json({message: 'Logged in successfully', token: token, userId: confirmedUser._id.toString()})
      
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
    
}