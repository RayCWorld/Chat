const mongoose = require('mongoose')

const MsgSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
})

module.exports = MsgSchema