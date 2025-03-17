const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/Product')
const User = require('./models/User')
const products = require('./data/products')


dotenv.config()

//CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)

//FUNCTION TO SEED DATA
const seedData = async ()=>{
    try {
        //Clear existing data
        await Product.deleteMany()
        await User.deleteMany()

        //Create a default admin User
        const createdUser = await User.create(
            {
                name:"Admin User",
                email:'admin@example.com',
                password:'12345678',
                role:'admin',
            }
        )

        //Assign the default user ID to each product
        const userID = createdUser._id
        const sampleProducts = products.map((product)=>{
            return {...product,user:userID}
        })

        //Insert the products into the database
        await Product.insertMany(sampleProducts)
        console.log("Product data seeded successfully!")
        process.exit
    } catch (error) {
console.error('Error seeding the data:',error)
process.exit(1)
    }
}

seedData()