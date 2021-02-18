const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { createSecureServer } = require('http2');
const createNewUser = require('./controllers/userController');

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./controllers/messageController')
require('./controllers/userController')

app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "public"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.render('chat.html')
})

app.get('/login', (req, res) => {
    res.render('login.html')
})

app.get('/register', (req, res) => {
    res.render('cadastro.html')
})

app.post('/register-new', (req, res) => {
    let userObject = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        idade: req.body.old,
        password: req.body.password
    }
    createNewUser(userObject)
    res.redirect('login.html')
})

//Quando um client se conectar | on connection | socket é o client
io.on('connection', socket => {
    //Mostra o id
    console.log(`Socket conectado: ${socket.id}`)

    //Envia mensagens para todomundo
    socket.on('sendMessage', data => {
        addMenssage(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

http.listen(process.env.PORT || 3000)