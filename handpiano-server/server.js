const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const PORT = 3000

//runs when a client makes connection to server
io.on('connection', socket => {
    let roomName; //store room name (roomId)
    let userId; //stores users name

    //
    io.sockets.on('connection', socket => {
        socket.on('create', room => {

          socket.join(room.id);
          socket.to(room.id).emit('message', room )
          userId = room.name
          roomName = room.id
          console.log(`user ${userId} connected to ${roomName}`)
        })
        
        socket.on('notes-to-play', data =>{
            console.log(typeof data)
            
            socket.broadcast.to(roomName).emit('notes-to-play', data)
        })
        socket.on('notes-to-release', data => {
            
            socket.broadcast.to(roomName).emit('notes-to-release', data)
        })
        
    });
    
    socket.on('disconnect', () => {
      console.log(`user ${userId} disconnected`)
    })
})

server.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})



