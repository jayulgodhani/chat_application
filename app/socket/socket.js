'use strict';
const terminalLogger = require('../util/terminalLogger');

let io;
let connectedUsers = [];
let clientSocketIds = [];

function connect(server, sessionMiddleware) {
    terminalLogger('socket started');
    io = require('socket.io')(server);
    io.on('connection', socket => {
        terminalLogger('conected')
        socket.on('disconnect', () => {
            terminalLogger('disconnected')
            connectedUsers = connectedUsers.filter(item => item.socketId != socket.id);
            io.emit('updateUserList', connectedUsers)
        });

        socket.on('loggedin', function (user) {
            terminalLogger('loggedin ' + user)
            clientSocketIds.push({ socket: socket, userId: user.user_id });
            connectedUsers = connectedUsers.filter(item => item.user_id != user.user_id);
            connectedUsers.push({ ...user, socketId: socket.id })
            io.emit('updateUserList', connectedUsers)
        });

        socket.on('create', function (data) {
            terminalLogger('create' + data);
            socket.join(data.room);
            let withSocket = getSocketByUserId(data.withUserId);
            socket.broadcast.to(withSocket.id).emit('invite', { room: data })
        });
        socket.on('joinRoom', function (data) {
            terminalLogger('joinRoom' + data);
            socket.join(data.room.room);
        });

        socket.on('message', function (data) {
            terminalLogger('message' + data);
            socket.broadcast.to(data.room).emit('message', data);
        })
    });
}

const getSocketByUserId = (userId) => {
    let socket = '';
    for (let i = 0; i < clientSocketIds.length; i++) {
        if (clientSocketIds[i].userId == userId) {
            socket = clientSocketIds[i].socket;
            break;
        }
    }
    return socket;
}

module.exports = {
    connect
};