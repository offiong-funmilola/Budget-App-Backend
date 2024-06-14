const User = require('../models/user')
const Record = require('../models/record')


exports.getUser = (req, res, next) => {
    const userId = req.params.userId
    //console.log(req.params.userId)
    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('User not Found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({message:"Current user returned", user: user})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.createRecord = (req, res, next) => {
    const month = req.body.month
    const year = req.body.year
    const saving = req.body.saving
    const income = req.body.income
    const category = req.body.category
    const expenditure = req.body.Expenditure
    const balance = req.body.accountBalance
    let creator
    const record = new Record({
        month: month, 
        year: year, 
        saving: saving,
        income : income,
        category: category,
        expenditure: expenditure,
        balance: balance,
        creator: req.userId
    })
    record.save()
    .then(result => {
        return User.findById(req.userId)
    })
    .then(user => {
        if(!user) {
            const error = 'User not found'
            error.status = 404
            throw error
        }
        creator = user
        user.records.push(record)
        return user.save()
    })
    .then(result => {
        res.status(201).json({message:'Record created successfully', creator: {id: creator._id.toString(), name: creator.name}})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.addIncome = (req, res, next) => {

}