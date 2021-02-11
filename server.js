const express = require('express');
const path = require('path')

const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static(path.join(__dirname, "public")))
app.set('views', path.join(__dirname, "public"))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

//array que armazena todas as mensagens
let messages = []


//Quando um client se conectar | on connection | socket é o client
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
       messages.push(data)
       socket.broadcast.emit('receivedMessage', data)
    })
})

http.listen(3000)