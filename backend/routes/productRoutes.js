const express = require('express')
const Product = require('../models/Product')
const { protect ,admin} = require("../middleware/authMiddleware")

const router = express.Router()
//@route POST /api/products
//@desc create a new Product
//@access Private/Admin

router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gernder, images, isFeatrued, isPublished, tags, dimensions, weight, sku } = req.body
        const product = new Product({
            name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gernder, images, isFeatrued, isPublished, tags, dimensions, weight, sku, user: req.user._id //id of Admin user creating the product
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')

    }
})

module.exports = router;