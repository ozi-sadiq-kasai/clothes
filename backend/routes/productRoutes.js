const express = require('express')
const Product = require('../models/Product')
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()
//@route POST /api/products
//@desc create a new Product
//@access Private/Admin
//Create product

router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatrued, isPublished, tags, dimensions, weight, sku } = req.body
        const product = new Product({
            name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatrued, isPublished, tags, dimensions, weight, sku, user: req.user._id //id of Admin user creating the product
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')

    }
})

//Update product
//@route PUT /api/products/:id
//@desc Update an existing product ID 
//@access Private/Admin

router.put("/:id", protect, admin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body
        const product = await Product.findById(req.params.id)
        if (product) {
            //Update product fields
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.sizes = sizes || product.sizes
            product.colors = colors || product.colors
            product.collections = collections || product.collections
            product.material = material || product.material
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isPublished = isPublished || product.isPublished
            product.isFeatured = isFeatured || product.isFeatured
            product.tags = tags || product.tags
            product.dimensions = dimensions || product.dimensions
            product.weight = weight || product.weight
            product.sku = sku || product.sku

            //Save updated product to database
            const updatedProduct = await product.save()
            res.json(updatedProduct)
        } else {
            res.status(404).json({ message: 'Product Not Found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})

//Delete product
//@route DELETE /api/products/:id
//@desc Delete an existing product ID 
//@access Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        //Find the product by ID
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.deleteOne()
            res.json({ message: 'Product Deleted' })
        } else {
            res.status(404).json({ message: 'Product Not Found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }

})


//Get All products with optional query filters
//@route GET /api/products
//@access Public

router.get("/", async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit } = req.query
        let query = {}
        // Filter logic
        if (collection && collection.toLowerCase() !== "all") {
            query.collections = collection
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category
        }
        if (material) {
            query.material = { $in: material.split(',') }
        }
        if (brand) {
            query.brand = { $in: brand.split(',') }
        }
        if (size) {
            query.sizes = { $in: size.split(',') }
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender
        }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }

        //Sort Logic
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc': sort = { price: 1 };
                    break;
                case "priceDesc": sort = { price: -1 }
                    break;
                case "popularity": sort = { rating: -1 }
                    break;
                default:
                    break;
            }
        }

        // Fetch products and apply sorting and limit
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0)
        res.json(products)


    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})


//@route GET/api/products/:id
//desc Get a single product  ID
//@access Public

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)

        } else {
            res.status(404).json({ message: 'Product Not Found' })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
    }
})


//@route GET/api/products/similar/:id
//desc Retireve similar products based on the current product's and category
//@access Public

router.get('/similar/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }

        const similarProducts = await Product.find({
            _id: { $ne: id }, //Exclude the current product ID  
            gender: product.gender,
            category: product.category,
        }).limit(4)
        res.json(similarProducts)
    } catch (error) {
console.error(error)
res.status(500).send('Server Error')
    }
})

module.exports = router