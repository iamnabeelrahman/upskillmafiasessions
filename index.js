const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { route } = require("./routes/user.route")
dotenv.config()
const app = express()
const PORT = 3003

app.use(express.json())

const MONGO_URL = process.env.MONGO_URL
console.log(MONGO_URL);

const connectDB = mongoose.connect(`${MONGO_URL}/crud`)
.then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
        console.log("Server is running on ", PORT);
    })
    
})

app.use("/api", route)

