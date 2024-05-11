const express = require('express');
const router = express.Router()

const User = require('../models/User');

const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "rablo140";

router.post('/createuser', [

    body('email').isEmail(),
    body('password').isLength({ min: 5 })

],
    async (req, res) => {

        console.log(jwtSecret);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        try {

            let checkIt = await User.findOne({ email: req.body.email });

            if(checkIt){
                return res.status(400).json({ errors: 'You are already a user.' });
            }

            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })

            let userData = await User.findOne({ email: req.body.email });

            const newData = {
                User: {
                    id: userData.id
                }
            }

            const newAuthToken = jwt.sign(newData, jwtSecret)

            res.json({ success: true, authToken: newAuthToken });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post('/loginuser', async (req, res) => {

    try {

        let userData = await User.findOne({ email: req.body.email });

        if (!userData) {
            return res.status(400).json({ errors: 'Try logging with correct credentials' });
        }

        const passwordCmp = await bcrypt.compare(req.body.password, userData.password);

        if (!passwordCmp) {
            return res.status(400).json({ errors: 'Try logging with correct credentials' });
        }

        const data = {
            User: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret)

        res.json({ success: true, authToken: authToken });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post('/extractUserData', [], async (req, res) => {
    const token = req.body.authToken;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const userData = await User.findById(decoded.User.id);
        return res.json({ success: true, userId: userData.id });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router; 