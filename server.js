const express = require('express');
const path = require('path')

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "public"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use('/chat', (req, res) => {
    res.render('chat.html')
})

app.use('/login', (req, res) => {
    res.render('login.html')
})

app.use('/register', (req, res) => {
    res.render('cadastro.html')
})

//array que armazena todas as mensagens
let messages = []


//Quando um client se conectar | on connection | socket é o client
io.on('connection', socket => {
    //Mostra o id
    console.log(`Socket conectado: ${socket.id}`)

    //Carrega mensagens anteriores
    socket.emit('previousMessages', messages)

    //Envia mensagens para todomundo
    socket.on('sendMessage', data => {
       messages.push(data)
       socket.broadcast.emit('receivedMessage', data)
    })
})

http.listen(process.env.PORT || 3000)