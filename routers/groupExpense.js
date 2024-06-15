const express = require("express");
const router = express.Router();
const { GroupExpense } = require('../models/groupExpenseModel');
const path = require("path");
const mongoose = require('mongoose');
const multer = require("multer");


const FILE_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/jpeg': 'jpeg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })


// Get All the PersonalExpenses
router.get('/', (req, res) => {
    GroupExpense.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        res.send(err.message)
    });
})

// Get the PersonalExpenses by 
router.get('/:category', (req, res) => {
    const category = req.params.category
    try {
        GroupExpense.find({ category: category }).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.send(err)
        });
    } catch (error) {
        res.send(err)
    }
})


// Post A Expense to the Database
router.post('/', upload.single('image'), async (req, res) => {
    const groupExpense = await GroupExpense.find({ category: req.body.category });
    if (!groupExpense) { return res.status(400).json({ success: false, message: "Category Exist" }) }
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/images/`;
    const expense = new GroupExpense(
        {
            category: req.body.category,
            description: req.body.description,
            image: `${basePath}${fileName}`,
        }
    )
    if (!expense) {
        return res.status(400).json({ success: false, message: "Expense Not Found " })
    }

    await expense.save().then((expense => {
        res.status(200).json(expense)
    })).catch((err) => {
        res.status(500).json({
            error: err.errors.name.message,
        })
    });

})

module.exports = router;

