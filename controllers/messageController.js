const Mongoose = require('mongoose')
const connect = require('../database/connect')
const MsgModel = require('../model/messageModel')

const Msg = Mongoose.model('mensagens', MsgModel);

function addMenssage(data){
    //console.log(data)
    const msg = new Msg({
        author: data.author,
        message: data.message,
        time: data.time,
        date: data.date,
    })

    console.log(msg)
    
    msg.save().then(() =>{
        console.log('mensagem salva')
    }).catch(err => {
        console.log(err)
    })
}

module.exports = addMenssage
