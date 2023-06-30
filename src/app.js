const express = require('express')
require('dotenv').config()
require('./db/mongoose')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const hotelsRouter = require('./routes/hotels')
const roomsRouter = require('./routes/rooms')

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', roomsRouter)

module.exports = app