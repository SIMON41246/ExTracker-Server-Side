const { required } = require('joi')
const mongoose = require('mongoose')

// Schema of PersonalExpense
const GroupExpenseSchema = mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }
)

// Notation of Model of PersonalExpense
const GroupExpense = mongoose.model('GroupExpense', GroupExpenseSchema)

exports.GroupExpense = GroupExpense