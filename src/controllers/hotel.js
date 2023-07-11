const Hotel = require('../models/hotel')
const Room = require('../models/room')

const createHotel = async (req, res, next) => {
    const user = req.user
    try {
        if (!user.isAdmin) {
            throw new Error('you are not admin, please register as admin to perform the operation!')
        }
        const newHotel = new Hotel(req.body)
        await newHotel.save()
        res.status(201).send(newHotel)

    } catch (e) {
        next(e)
    }
}

// const createHotel = async (req, res, next) => {

//     const newHotel = new Hotel(req.body)
//     try {
//         await newHotel.save()
//         res.status(201).send(newHotel)
//     }
//     catch (e) {
//         next(e)
//     }
// }

const updateHotel = async (req, res, next) => {
    const user = req.user
    try {
        if (!user.isAdmin) {
            throw new Error('you are not admin!')
        }
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).send(updateHotel)
    } catch (e) {
        next(e)
    }
}

const deleteHotel = async (req, res, next) => {
    const user = req.user
    try {
        if (!user.isAdmin) {
            throw new Error('you are not admin!')
        }
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send('The Hotel has been deleted!')
    } catch (e) {
        next(e)
    }
}

const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        if (!hotel) {
            throw new Error('hotel not found!')
        }
        res.status(200).send(hotel)
    } catch (e) {
        next(e)
    }
}

const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find()
        res.status(200).send(hotels)
    } catch (e) {
        next(e)
    }
}

const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid)
        const allRooms = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room)
        }))
        res.status(200).send(allRooms)
    } catch (e) {
        next(e)
    }
}

module.exports = { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getHotelRooms }