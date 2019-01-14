const express= require('express')
const router = express.Router()
const data = require('../data.json')

router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data.stops)
})

module.exports = router 