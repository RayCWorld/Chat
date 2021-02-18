const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://'+process.env.DATABASE_USER || "chatUser" +':'+ process.env.DATABASE_PASS || "RayCWorld" +'@chat.te4fz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
})

module.exports = mongoose