'use client'

import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import UsersList from '../components/UsersList';
import ChatWindow from '../components/ChatWindow';
import {getMyPeerId, signalMyPeer, connectPeer, sendMessage, peer} from "@/services/peer";
import { socket } from "@/services/socket";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        // Emitir join una sola vez
        socket.emit('join', null);

        // Funciones para manejar los eventos
        const handleUserJoined = (users) => {
            const usersWithoutMe = users.filter(u => u.socketId !== socket.id);
            setUsers(usersWithoutMe);
        };

        const handleUserLeft = (users) => {
            const usersWithoutMe = users.filter(u => u.socketId !== socket.id);
            setUsers(usersWithoutMe);
        };

        const handleReceivePeerId = ({ peer, socketId }) => {
            const peerLocal = signalMyPeer(peer, socketId)
            peerLocal.on('data', (data)=>{
                const now = new Date();
                const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                console.log(timestamp); // Por ejemplo: "14:32"
                const newMessage = {text:data.toString(), isSent: false, timestamp: timestamp}
                addMessage(newMessage)
            })
        };

        const handleConnectPeer = ({ peer, socketId }) => {
            connectPeer(peer);
        };


        // Registrar los listeners una sola vez
        socket.on('userJoined', handleUserJoined);
        socket.on('userLeft', handleUserLeft);
        socket.on('receivePeerId', handleReceivePeerId);
        socket.on('connectPeer', handleConnectPeer);

        // Limpieza: quitar listeners al desmontar el componente
        return () => {
            socket.off('userJoined', handleUserJoined);
            socket.off('userLeft', handleUserLeft);
            socket.off('receivePeerId', handleReceivePeerId);
            socket.off('connectPeer', handleConnectPeer);
        };
    }, []);

    const onUserSelected = (user) => {
        setSelectedUser(user);
        const peer = getMyPeerId(user.socketId);

        peer.on('data', (data)=>{
            const now = new Date();
            const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            console.log(timestamp); // Por ejemplo: "14:32"
            const newMessage = {text:data.toString(), isSent: false, timestamp: timestamp}
           addMessage(newMessage)
        })
    };

    useEffect(() => {
    }, [selectedUser]);

    const onBack = () => {
        setSelectedUser(null);
    };


    const handleMessageSend = (message)=>{
        sendMessage(message)
    }

    const handleCall = ()=>{
        
    }

    const addMessage = (message)=>{
        console.log(message)
        setSelectedUser((prevUser) => {
            if (!prevUser) return prevUser;
            return {
                ...prevUser,
                messages: [...prevUser.messages, message]
            };
        });
    }

    return (
        <div className="h-screen bg-gray-100 flex">
            {/* Lista de usuarios */}
            <div
                className={`${
                    selectedUser ? 'hidden' : 'flex flex-col w-full md:w-1/3 bg-white'
                } border-r border-gray-200`}
                id="users-list-container"
            >
                <div className="p-4 bg-gray-800 text-white flex items-center">
                    <div className="w-6 h-6 mr-2">foto</div>
                    <h1 className="text-xl font-semibold">Contacts</h1>
                </div>
                <UsersList
                    users={users}
                    selectedUser={selectedUser}
                    onUserSelect={onUserSelected}
                />
            </div>

            {/* Ventana de chat */}
            <div
                className={`${
                    !selectedUser ? 'hidden' : 'flex flex-col flex-1'
                } bg-gray-50`}
                id="chat-container"
            >
                <ChatWindow
                    selectedUser={selectedUser}
                    onBack={onBack}
                    onMessageSend={handleMessageSend}
                    addMessage={addMessage}
                    onCall={handleCall}
                />
            </div>
        </div>
    );
}
