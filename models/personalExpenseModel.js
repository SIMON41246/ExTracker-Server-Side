const { required } = require('joi')
const mongoose = require('mongoose')

// Schema of PersonalExpense
const PersonalSchema=mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: false,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        image: {
            type: String,
            required: true
        },
        groupExpense: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GroupExpense",
        }
    }
)

// Notation of Model of PersonalExpense
const PersonalExpense=mongoose.model('PersonalExpense',PersonalSchema)

exports.PersonalExpense=PersonalExpense