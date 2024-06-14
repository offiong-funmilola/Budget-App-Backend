const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expensesSchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    items:{
        type: Array, 
        default: []
    },
    recordId : {
        type: Schema.Types.ObjectId,
        ref: 'Record',
        required: true
    }
})

module.exports = mongoose.model('expenses', expensesSchema)