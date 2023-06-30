const express = require('express')

const router = new express.Router()

router.get('/', async (req, res) => {
    res.send('HELLO users')
})
router.get('/register', async(req, res) => {
    res.send('HELLO REGISTER')
})

module.exports = router