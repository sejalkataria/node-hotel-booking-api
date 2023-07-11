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

const bookRoom = async (req, res, next) => {
    const user = req.user
    if(!user){
        return next(createError(403, 'you are not authorized!'))
    }
    try {
        const room = await Room.findOne({ "roomNumbers._id": req.params.id })
        const numbers = room.roomNumbers
        const foundRoom = numbers.findIndex(z => z._id == req.params.id)
        const unavaiable = numbers[foundRoom].unavaiableDates
        const startDate = new Date(req.body.start)
        const endDate = new Date(req.body.end)
        const date = new Date(startDate)
        const dates = []
        while (date <= endDate) {
            unavaiable.some((a) => {
                if (a.getTime() === date.getTime()) {
                    throw new Error('some dates are already booked, please check dates avaiablity')
                }
            })
            dates.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        await Room.updateOne({ "roomNumbers._id": req.params.id },
            { $push: { "roomNumbers.$.unavaiableDates": dates } }
        )
        res.status(200).send("Room status has been updated")
    }
    catch (e) {
        next(e)
    }
}

module.exports = { createRoom, updateRoom, deleteRoom, getRoom, getRooms, bookRoom }