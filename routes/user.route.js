const express = require("express")
const {getusers, createUser} = require("../controllers/users.controller")

const route = express.Router()

// get, put, post, Delete


route.get("/users", getusers)
route.post("/create-user", createUser)


module.exports = {route}