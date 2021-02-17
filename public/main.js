String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};


//Ouvir a conexão pelo socket
//var socket = io(process.env.APP_URL + ':' + process.env.PORT || 3000)
//this.socket = io('https://chat-chat11.herokuapp.com/')
var socket = io("http://localhost:3000")

function renderMessage(message){
        $('.messages').append('<div class="message"><strong>'+ message.author.escape() +' </strong> ' + '<span>' + message.time + '</span>: ' + message.message.escape() +'</div>')
        $(".messages").scrollTop($(".messages")[0].scrollHeight);
    }

socket.on('receivedMessage', function(message){
    renderMessage(message)
})

//verificar o submit do form
$('#chat').submit(event => {
    event.preventDefault()

    now = new Date
    var date = now.getDay() +'/'+ now.getMonth() +'/'+ now.getFullYear()
    var dateString = date.toString()

    var time = now.getHours() +':'+ now.getMinutes() +':'+ now.getSeconds()
    var timeString = time.toString()

    var author = $('input[name=username]').val()
    var message = ($('input[name=message]').val()).toString()

    $('input[name=message]').val("")

    if(author && message){
        if (message.length <= 50) {
        var messageObject = {
            author: author,
            message: message,
            time: timeString,
            date: dateString
        }
        renderMessage(messageObject,)
        socket.emit('sendMessage', messageObject)
    }else {
        console.log('Não foi não?')

    }
}
})