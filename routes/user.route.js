const express = require("express")
const {getusers, createUser,updateUser,deleteUser,findUserById} = require("../controllers/users.controller")

const route = express.Router()

// get, put, post, Delete


route.get("/users", getusers)
route.post("/create-user", createUser)
route.post("/update-user/:id",updateUser)
route.post("/delete-user/:id",deleteUser)
route.post("/find-user/:id",findUserById)


module.exports = {route}