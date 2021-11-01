const express = require ('express');
const cors = require('cors');
const router = require('./router');
const socketio = require('socket.io')
const http = require("http");

const PORT = process.env.PORT || 5000;

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users')
const app = express();   
app.use(cors())    
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "https://61804468998b88009d72c59d--livechatappibra.netlify.app/",
      methods: ["GET", "POST"],
      credentials:true
    }})

// calling my routers  
app.use(router)



server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});


io.on("connect", (socket) => {
    console.log("user has connected !"); 

    // i can use callback function to do what i want to happen after emiting my data such as handling errors
    socket.on("Join", ({name, room}, callback) =>{
        const {error, user} = addUser({id: socket.id, name, room})
        if (error) return callback(error);
        socket.join(user.room)

        socket.emit('message', {user: "admin Ibrahim", text: `${user.name}, welcome to the room ${user.room}`});
        // display message to all users except for the user
        socket.broadcast.to(user.room).emit('message', {user: 'admin Ibrahim', text: `${user.name} has joined !`})
        callback();
    }),
    
    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message})
        callback();
    })

    socket.on('Users', ({room, user}) => {

    })
    socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user){

        io.to(user.room).emit('message', {user : "Admin ibrahim", text: `${user.name} has left`})
    }
    });
  });


