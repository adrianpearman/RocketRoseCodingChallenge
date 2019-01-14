const express = require('express')
const router = express.Router()

router.get('*', (req, res) => {
    res.send('Error Occured')
})

module.exports = router