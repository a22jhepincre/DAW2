import Peer from 'simple-peer';
import {socket} from "@/services/socket";

let peer = null;

let streamingStarted = false;

export function getMyPeerId(socketIdUserSelected) {
    console.log("I'm the initiator and i'm ready to get my Peer ID");
    peer = new Peer({
        //initiator: true, //qui inicia la trucada
        initiator: true,
        trickle: false,
        //stream: myStream,
    });

    //Handshake per iniciar la comunicació sense server
    peer.on("signal", (data) => {
        //enviar via socket.io les dades d'inici de trucada.
        /**
         * infomració que tindria que enviar via socket.io per localitzar i pasar la ifnormació a l'altre
         * peer.
         * id <-- id de l'usuari que vull trucar.
         * data <-- les dades qeu envio
         * el meu id
         */
        console.log("MY ID TO MAKE A CALL:");
        console.log(data);

        if (data.type == "offer") {
            const peerWithSocketId = {socketId:socketIdUserSelected, peer: JSON.stringify(data)};
            socket.emit('sendPeerId', peerWithSocketId);
        } else {
        }
    });
    // peer.on("data", (data) => {
    //     console.log("este es el receiver:", data.toString());
    // });
    peer.on("stream", (stream) => {
        //Stream de dades que rebo de l'altre costat
        console.log("event on stream from initiator");
        document.getElementById("remoteVideoStream").srcObject = stream;
        document.getElementById("remoteVideoStream").play();
    });

    peer.on("connect", () => {
    });
    peer.on("close", () => {
        console.log("close")
        streamingStarted = false;
    });
    peer.on("error", (err) => {
        console.log(err)
        streamingStarted = false;
    });

    return peer;
}

export function connectPeer(receivePeer){
    peer.signal(receivePeer);
}


export function signalMyPeer(offerPeer, socketId) {
    console.log("Signaling my peer");
    peer = new Peer({
        initiator: false,
        trickle: false,
        //stream: myStream,
    });
    peer.on("signal", (data) => {
        //es crida cada cop que es crea un nou objecte Peer
        console.log("MY ID TO ACCEPT CALL:");
        console.log(data);
        if (data.type == "answer") {
            // document.getElementById("yourID").value = JSON.stringify(data);
            const peerWithSocketId = {socketId:socketId, peer: JSON.stringify(data)};
            socket.emit('signalPeer', peerWithSocketId);
        } else {
        }
    });
    // peer.on("data", (data) => {
    //     console.log("este es el receiver:", data.toString());
    // });
    peer.on("stream", (stream) => {
        //Stream de dades que rebo de l'altre costat

        console.log("event on stream from NO initiator user");

        document.getElementById("remoteVideoStream").srcObject = stream;
        document.getElementById("remoteVideoStream").play();
    });

    //Need to signal the initiator to be abble to get our ID
    peer.signal(offerPeer);

    peer.on("connect", () => {
    });
    peer.on("close", () => {
        console.log("close")
        streamingStarted = false;
    });
    peer.on("error", (err) => {
        console.log(err)

        streamingStarted = false;
    });

    return peer;

}

export function sendMessage (message){
    peer.send(message);
}