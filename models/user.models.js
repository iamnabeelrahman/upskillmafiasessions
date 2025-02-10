const mongoose = require("mongoose");
// data types
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: Number

}, {timestamps: true})

const Users = mongoose.model("Users", userSchema);

module.exports ={ 
    Users
}

