const express = require('express')
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*') //the * stands for access to all domain, however we can list the name of the specific domains we want to access
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
}) 
app.use('/auth', authRoutes)

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

mongoose.connect('mongodb+srv://fawolefunmilola2:zXCt5pIwE6za2ArR@cluster0.svlrvxo.mongodb.net/finance')
.then(res => {
    console.log('connected')
    app.listen(8000)
})
.catch(err => {
    console.log(err)
})


