const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})
const PORT = 3000

const names = {}

//runs when a client makes connection to server
io.on('connection', socket => {
    let roomName; //store room name (roomId)
    let userId; //stores users name

    //on connection it creates a room using the room id and then sends the name back
    io.sockets.on('connection', socket => {
        socket.on('create', room => {
          //joins client to room it just created
          socket.join(room.id)
          //socket.to(room.id).emit('message', room.name)
          userId = room.name
          roomName = room.id
          names[roomName].push(name)
          socket.to(roomName).emit(names[roomName])
          console.log(`user ${userId} connected to ${roomName}`)
        })
      
    })
      //sends user name 
        socket.to(roomName).emit('message', userId)
        
        socket.on('notes-to-play', data =>{
            console.log(typeof data)
            
            socket.broadcast.to(roomName).emit('notes-to-play', data)
        })
        socket.on('notes-to-release', data => {
            
            socket.broadcast.to(roomName).emit('notes-to-release', data)
        })
    
    socket.on('disconnect', () => {
      console.log(`user ${userId} disconnected`)
    })
})

server.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})
