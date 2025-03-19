const express = require('express');
const Order = require('../models/orde');
const {protect} = requier('../middleware/authMiddleware');

const router = express.Router()

//@route GET /api/orders/my-orders
//@desc Get logged in user's orders
//@access Private
router.get('/my-orders', protect, async (req, res) => {
    try {
        // Find all orders that belong to the logged in/authenitcated user
        const orders = await Order.find({user:req.user._id}).sort({
            createdAt:-1
        })//sort by most recent orders
        res.json(orders)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server Error'})
    }
})

//@route GET /api/orders/:id
//@desc Get order details by ID
//@access Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email')
        if(order){
            res.json(order)
        } else {
            res.status(404).json({message:'Order Not Found'})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server Error'})
    }
})