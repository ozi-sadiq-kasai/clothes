const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

//Connect database
connectDB()


//Api Routes
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })