const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()
const data = require('../data.json')
const Path = path.join(path.dirname(process.mainModule.filename), 'data', 'data.json')

router.get('/currentLocation', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(data.currentDriverLocation)
})

router.post('/currentLocation', (req, res) => {
    // Logging the request to verify details
    console.log(req.body)

    // The request would update the data.json file 

    // sendig response back to front end code.
    res.sendStatus(200)
})

module.exports = router