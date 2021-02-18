const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nickname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    idade:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = UserSchema