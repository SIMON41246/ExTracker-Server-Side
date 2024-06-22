const express = require("express");
const router = express.Router();
const { PersonalExpense } = require('../models/personalExpenseModel');
const auth=require("../middlewares/verifyauth")


router.get('/',auth, async (req, res) => {
    const result = await PersonalExpense.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' }
            }
        }
    ]);
    res.json(result)
})

module.exports = router;
