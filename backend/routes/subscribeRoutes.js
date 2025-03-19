const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

//@route POST /api/subscribe
//@desc Handle newsletter subscription
//@access Public
router.post('/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        //Check if the email is already subscribed
        let subscriber = await Subscriber.findOne({
            email: email,
        });
        if (subscriber) {
            return res.status(400).json({ message: 'Email is already subscribed' });
        }
        //Create a new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
        console.error(error)
        res.status(400).json({ message:"Server Error" });
    }
});

module.exports = router