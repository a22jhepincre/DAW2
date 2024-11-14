const socket = io('http://192.168.16.172:3000');

let sendButton;
let logOut;

let initSendButton = ()=>{
    sendButton.addEventListener('click', () => {
        const message =localStorage.getItem('name') + ": "+document.getElementById('messageInput').value;
        if (message) {
            socket.emit('message', message);
            document.getElementById('messageInput').value = '';
        }
    });
}

let initLogOut = ()=>{
    logOut.addEventListener('click', function (){
        console.log("clkick lohout")
        localStorage.removeItem('name');
        verifyUser();
    })
}
const verifyUser = () => {
    const name = localStorage.getItem('name');
    if (!name) {
        window.location.href = 'index.html';
    }
};

function init(){
    sendButton = document.querySelector('#sendButton');
    logOut = document.querySelector('#log-out');
}

document.addEventListener('DOMContentLoaded', () => {

    verifyUser();
    init();
    initSendButton();
    initLogOut();
    // Conectar al servidor actual

    // Verificar conexión
    socket.on('connect', () => {
        console.log('Connected to server');
        document.querySelector('#name-user').textContent = localStorage.getItem('name');
        document.getElementById('status').textContent = 'Connected';
    });

    // Recibir mensajes
    socket.on('message', (data) => {
        const messagesDiv = document.getElementById('messages');
        const messageElement = document.createElement('p');
        console.log(data.id)
        messageElement.textContent = data.message;
        messagesDiv.appendChild(messageElement);
    });

    // Manejar desconexión
    socket.on('disconnect', () => {
        document.getElementById('status').textContent = 'Disconnected';
    });
});
