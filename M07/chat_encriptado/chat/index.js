const socket = io("http://localhost:3000");
let chatMessages;
let messageInput;

socket.on("connect", () => {
    console.log("Conectado al servidor de chat con ID:", socket.id);
});

function initChat() {
    chatMessages = document.getElementById("chatMessages");
    messageInput = document.getElementById("messageInput");
}

function sendMessage() {
    const message = messageInput.value.trim();
    const password = document.querySelector('#password').value;
    console.log(password)
    const messageEncrypted = doCryptAES(message, password)
    if (message) {
        console.log(message)
        socket.emit("sendMessage", {message: messageEncrypted.toString(), socketId: socket.id});
        messageInput.value = "";
    }
}

socket.on("receivedMessage", (data) => {
    const password = document.querySelector('#password').value;
    data.message = doDecryptAES(data.message, password);
    if (data.socketId === socket.id) appendMessage(data.message, "sent");
    else appendMessage(data.message, "received");

});

function appendMessage(message, type) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", type);
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function initSubmit (){
    messageInput.addEventListener('keydown', function (e){
        if (e.key === 'Enter')sendMessage();
    })
}

function doCryptAES(message, password) {
    return CryptoJS.AES.encrypt(message, password);
}

function doDecryptAES(messageEncrypted, password) {
    const bytes = CryptoJS.AES.decrypt(messageEncrypted, password);
    return bytes.toString(CryptoJS.enc.Utf8); // Convierte el resultado a texto legible
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Chat script ejecutando...");
    initChat();
    initSubmit();
});
