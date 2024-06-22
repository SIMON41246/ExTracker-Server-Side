const mongoose=require("mongoose")
const express=require('express')
const cors = require('cors')
const app=express()
const groupExpense=require('./routers/groupExpense');
const personalExpense=require('./routers/personalExpense');
const balance=require('./routers/balance');
const auth=require('./routers/auth')
app.use(express.json());
app.use(cors());

app.use('/personal',personalExpense),
app.use('/group',groupExpense)
app.use('/balance',balance)
app.use('/images', express.static(__dirname + '/images'));
app.use("/auth",auth)




mongoose.connect("mongodb://127.0.0.1:27017/ExTracker", {
    dbName: "ExTracker"
})
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.error(err));


app.listen(4000, () => {
    console.log("Listening to port 4000");
})