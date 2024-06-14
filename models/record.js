const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordShema = new Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    income: [{
        source: String,
        amount: Number
    }],
    
    saving: {
        type: Number
    },
    expenditure: {type: Array, default: []},
    balance: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expensesId: [{
        type: Schema.Types.ObjectId,
        ref: "Expenses"
    }]
}, {timestamps: true})

module.exports = mongoose.model('Record', recordShema)