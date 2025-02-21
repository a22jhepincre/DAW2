const socket = io("http://localhost:3000");
let chatMessages;
let messageInput;
let publicKey;
let privateKey;
let privateKeyValue;

let usersKeys = [];

socket.on("connect", () => {
    console.log("Conectado al servidor de chat con ID:", socket.id);
    generateKeysRSA1();
});

function initChat() {
    privateKeyValue = null;
    chatMessages = document.getElementById("chatMessages");
    messageInput = document.getElementById("messageInput");
    publicKey = document.getElementById('publicKey');
    privateKey = document.getElementById('privateKey');
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        usersKeys.forEach((user)=>{
            const pKeyUser = user.publicKey;
            const socketIdUser = user.socketId;
            let encryptor = new JSEncrypt();
            encryptor.setPublicKey(pKeyUser);
            const ciphertext = encryptor.encrypt(message);
            socket.emit("sendMessage", {message: ciphertext, socketId: socketIdUser});

        });
        messageInput.value = "";
    }
}

socket.on("receivedMessage", (data) => {
    try {
        let decryptor = new JSEncrypt();
        decryptor.setPrivateKey(privateKeyValue);
        const decryptedMessage = decryptor.decrypt(data.message);
        if (data.socketId === socket.id) {
            appendMessage(decryptedMessage, "sent");
        } else {
            appendMessage(decryptedMessage, "received");
        }
    } catch (error) {
        console.error("Error al desencriptar el mensaje:", error);
    }
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

    privateKeyValue = privateKey;
    this.publicKey.value = publicKey.toString();
    this.privateKey.value = privateKey.toString();

    socket.emit('sendPublicKey', {publicKey: publicKey, socketId: socket.id});
}

socket.on('receivedPublicKey', (users)=>{
    usersKeys = users
    console.table(usersKeys)
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Chat script ejecutando...");
    initChat();
    initSubmit();
});
