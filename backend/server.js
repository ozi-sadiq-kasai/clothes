const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3000

//Connect database
connectDB()

app.get('/', (req, res) => {
    res.send('Hello')
})

//Api Routes
app.use('/api/users',userRoutes)

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) })