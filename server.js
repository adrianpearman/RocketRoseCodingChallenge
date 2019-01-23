// Modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Environment Variablea
const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(bodyParser())
app.use(cors())

// Routes
app.use('/driver', require('./routes/driver'))
app.use('/bonusDriver', require('./routes/bonusDriver'))
app.use('/legs', require('./routes/legs'))
app.use('/stops', require('./routes/stops'))

// Initializing Server
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT: ${PORT}`)
})