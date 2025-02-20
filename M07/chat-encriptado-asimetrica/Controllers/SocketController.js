class SocketController {
    static initialize(io) {
        let userNumber = 0;
        let users = [];
        io.on('connection', (socket) => {
            socket.idUser = userNumber++;
            socket.on('connect', function (){
                users.push({socket:socket});
               io.emit('connected', null)
            });

            socket.on('sendMessage', function ({message, socketId}){
                console.log(message)
                io.emit('receivedMessage', {message, socketId})
            });
        });
    }
}

module.exports = SocketController;