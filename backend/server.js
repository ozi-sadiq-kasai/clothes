const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 4000

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)})