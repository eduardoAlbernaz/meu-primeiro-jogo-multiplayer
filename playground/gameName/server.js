import express from  'express'
import http from 'http'
import createGame from './public/game.js'
import socketIo from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketIo(server)

app.use(express.static('public'))

const game = createGame()
//game.start()

game.subscribe(command => {
    console.log(`> Emiting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', socket => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    game.addPlayer({ playerId: playerId })

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId })
        console.log(`> Player disconnected: ${playerId}`)
    })

    socket.on('move-player', command => {
        //funcionaria sem as proximas 2 linhas
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})

server.listen(3000 , () => {
    console.log('> Server Listening on port: 3000')
})