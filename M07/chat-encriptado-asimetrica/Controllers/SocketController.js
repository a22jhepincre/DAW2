class SocketController {
    static initialize(io) {
        let userNumber = 0;
        let users = [];

        io.on('connection', (socket) => {
            socket.idUser = userNumber++;

            socket.on('connect', function (){
            });

            socket.on('sendMessage', function ({message, socketId}){
                // console.log(message)
                io.to(socketId).emit('receivedMessage', {message, socketId})
            });

            socket.on('sendPublicKey', ({publicKey, socketId})=>{
                users.push({socketId: socketId, publicKey: publicKey});
                io.emit('receivedPublicKey', users);
            })
        });
    }
}

module.exports = SocketController;