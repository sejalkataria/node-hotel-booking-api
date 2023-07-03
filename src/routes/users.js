const express = require('express')
const {updateUser,deleteUser,getUser,getUsers}=require('../controllers/user')

const router = new express.Router()

//update user
router.put('/:id', updateUser)

//delete user
router.delete('/:id', deleteUser)

//get user
router.get('/:id', getUser)

//get all users
router.get('/', getUsers)


module.exports = router