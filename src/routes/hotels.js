const express = require('express')
const Hotel = require('../models/hotel')

const router = new express.Router()

//create Hotel
router.post('/', async (req, res) => {
    console.log('bodyyyy', req.body)
    const hotel = new Hotel(req.body)
    try {
        await hotel.save()
        res.status(201).send(hotel)
    } catch (e) {
        res.status(500).send({ e: e.message })
    }
})

module.exports = router