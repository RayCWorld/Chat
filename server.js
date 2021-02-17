const express = require('express');
const path = require('path');
const addMenssage = require('./controllers/messageController');

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

require('./controllers/messageController')

app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "public"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('chat.html')
})

app.use('/login', (req, res) => {
    res.render('login.html')
})

app.use('/register', (req, res) => {
    res.render('cadastro.html')
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