const socket = io("http://localhost:3000");
let chatMessages;
let messageInput;
let publicKey;
let privateKey;

socket.on("connect", () => {
    console.log("Conectado al servidor de chat con ID:", socket.id);
});

function initChat() {
    chatMessages = document.getElementById("chatMessages");
    messageInput = document.getElementById("messageInput");
    publicKey = document.getElementById('publicKey');
    privateKey = document.getElementById('privateKey');
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("sendMessage", {message: message, socketId: socket.id});
        messageInput.value = "";
    }
}

socket.on("receivedMessage", (data) => {
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

let generateKeysRSA1 = ()=>{
    const crypt = new JSEncrypt({ default_key_size: 2048 });
    const publicKey = crypt.getPublicKey();
    const privateKey = crypt.getPrivateKey();

    this.publicKey.value = publicKey.toString();
    this.privateKey.value = privateKey.toString();
}
function doCryptRSA1() {
    const plaintext = document.getElementById("sms").value;
    const ciphertext = crypt.encrypt(plaintext);

    document.getElementById("smsCrypt").value = ciphertext;


    // Decrypt the message using the private key
    const decrypted = crypt.decrypt(ciphertext);
    document.getElementById("smsDecrypt").value = decrypted;
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Chat script ejecutando...");
    initChat();
    initSubmit();
    generateKeysRSA1();
});
