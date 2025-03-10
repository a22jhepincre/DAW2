class SocketController {
    static initialize(io) {
        let userNumber = 0;
        let users = [];
        io.on('connection', (socket) => {
            // Esperamos a que el usuario emita 'join' para asignarle un id
            socket.on('join', () => {
                socket.idUser = userNumber++;
                console.log("Usuario conectado:", socket.idUser);
                users.push({ socketId: socket.id, id: socket.idUser, name: "User" + socket.idUser, messages: [] });
                io.emit('userJoined', users);
            });

            socket.on('sendPeerId', (data) => {
                console.log("sendPeerId...")
                const peer = JSON.parse(data.peer);
                const socketId = data.socketId;
                io.to(socketId).emit('receivePeerId', { peer: peer, socketId: socket.id });
            });

            socket.on('signalPeer', (data) => {
                console.log("signalPeerId...")
                const peer = JSON.parse(data.peer);
                const socketId = data.socketId;
                console.log(data);
                io.to(socketId).emit('connectPeer', { peer: peer, socketId: socket.id });
            });

            socket.on('disconnect', () => {
                // Filtrar usando la propiedad socketId, ya que así la guardamos
                users = users.filter(user => user.socketId !== socket.id);
                console.log("Usuario desconectado:", socket.id);
                io.emit('userLeft', users);
            });
        });
    }
}

module.exports = SocketController;
