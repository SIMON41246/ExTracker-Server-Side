const router = require('express').Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        //const { error } = validate(req.body);
        //if (error) res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registred");
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const token = user.generateAuthtoken();
        await user.save().then((result) => {
            if (result) { return res.header('auth-token', token).send("User Created SuccessFully") }
            else {
                res.status(400).send("Something Failed")
            }
        }).catch((err) => {
            res.status(500).send(err.message);
        });;
    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Email not found');

    // Check if the password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, "Production");
    res.header('auth-token', token).send(token);
});

module.exports = router;
