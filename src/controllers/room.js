const Room = require('../models/room')
const Hotel = require('../models/hotel')
const { createError } = require('../utils/error')

const createRoom = async (req, res, next) => {
    const user = req.user
    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)
    if (!user.isAdmin) {
        return next(createError(403, 'unAuthorized!'))
    }
    try {
        const foundHotel = await Hotel.findById(hotelId)
        if (!foundHotel) {
            return next(createError(404, 'Hotel not found!'))
        }
        const saveRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: saveRoom._id } })
        }
        catch (e) {
            next(e)
        }
        res.status(201).send(saveRoom)
    } catch (e) {
        next(e)
    }

}

const updateRoom = async (req, res, next) => {
    const user = req.user
    const roomId = req.params.id
    if (!user.isAdmin) {
        return next(createError(403, 'unAuthorized!'))
    }
    try {
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { $set: req.body }, { new: true })
        if (!updatedRoom) {
            return next(createError(404, 'Room not found'))
        }
        res.status(200).send(updatedRoom)
    } catch (e) {
        next(e)
    }

}

const deleteRoom = async (req, res, next) => {
    const user = req.user
    const hotelId = req.params.hotelid
    const roomId = req.params.id
    if (!user.isAdmin) {
        return next(createError(404, 'unAuthorized!'))
    }
    try {
        const deleteRoom = await Room.findByIdAndDelete(roomId)
        if (!deleteRoom) {
            return next(createError(404, 'Room not found!'))
        }
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } })
        } catch (e) {
            next(e)
        }
        res.status(200).send('The room has been deleted')
    } catch (e) {
        next(e)
    }
}

const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
        if (!room) {
            return next(createError(404, 'Room not found'))
        }
        res.status(200).send(room)
    } catch (e) {
        next(e)
    }
}

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        if (!rooms) {
            return next(createError(404, 'no rooms found!'))
        }
        res.status(200).send(rooms)
    } catch (e) {
        next(e)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getRooms }