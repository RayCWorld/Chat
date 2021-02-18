const Mongoose = require('mongoose')
const connect = require('../database/connect')
const UserModel = require('../model/userModel')

const User = Mongoose.model('usuarios', UserModel);

function createNewUser(data){
    const user = new User({
        name: data.name,
        nickname: data.nickname,
        email: data.email,
        idade: data.idade,
        password: data.password,
    })
    
    user.save().then(() =>{
        console.log('usuario cadastrado com sucesso')
    }).catch(err => {
        console.log(err)
    })
}

module.exports = createNewUser

/*    
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
*/