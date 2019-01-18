// Modules
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())

// Routes
app.use('/driver', require('./routes/driver'))
app.use('/legs', require('./routes/legs'))
app.use('/stops', require('./routes/stops'))

app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT: ${PORT}`)
})