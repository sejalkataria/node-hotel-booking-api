const express = require('express')
const cookieParser=require('cookie-parser')
require('dotenv').config()
require('./db/mongoose')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const hotelsRouter = require('./routes/hotels')
const roomsRouter = require('./routes/rooms')

const app = express()

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', roomsRouter)

app.use((e, req, res, next) => {
    const eStatus = e.status || 500
    const eMessage = e.message || 'Something went wrong!'
    return res.status(eStatus).json({
        success: false,
        status: eStatus,
        message: eMessage,
        stack: e.stack
    })
})



module.exports = app