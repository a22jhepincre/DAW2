'use client'

import React, {useEffect, useState} from 'react';
import {ArrowLeft, Send, Phone} from 'lucide-react';

const ChatWindow = ({selectedUser, onBack, onMessageSend, addMessage, onCall}) => {
    // Estado para el mensaje a enviar
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Opcional: limpiar el input al cambiar de usuario seleccionado
        setMessage('');
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Verificar que exista el callback y que no se envíe un mensaje vacío
        if (onMessageSend && message.trim() !== '') {
            onMessageSend(message.trim());
            setMessage('');
            const now = new Date();
            const timestamp = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
            console.log(timestamp); // Por ejemplo: "14:32"
            const newMessage = {text: message.trim(), isSent: true, timestamp: timestamp}
            addMessage(newMessage);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                    {onBack && (
                        <button className="mr-2" id="back-button" onClick={onBack}>
                            <ArrowLeft className="w-6 h-6"/>
                        </button>
                    )}
                    <img
                        src={selectedUser?.avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                        <h2 className="font-semibold">{selectedUser?.name}</h2>
                        <p className="text-sm text-gray-300">Online</p>
                    </div>
                </div>
                <button className="ml-4" id="call-button" onClick={onCall}>
                    <Phone className="w-6 h-6"/>
                </button>
            </div>

            {/* Messages */}
            <div
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100"
                id="messages-container"
            >
                {selectedUser?.messages &&
                    selectedUser?.messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                    message.isSent
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-800'
                                }`}
                            >
                                <p>{message.text}</p>
                                <p
                                    className={`text-xs mt-1 ${
                                        message.isSent ? 'text-blue-100' : 'text-gray-500'
                                    }`}
                                >
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                        // <div
                        //     key={index}
                        //     className='flex justify-start'
                        // >
                        //     <div
                        //         className='max-w-[70%] rounded-lg p-3 bg-blue-500 text-white'
                        //     >
                        //         <p>{message}</p>
                        //         <p
                        //             className='text-xs mt-1 text-blue-100'
                        //         >
                        //             01 Feb
                        //         </p>
                        //     </div>
                        // </div>
                    ))}
            </div>

            {/* Message Input */}
            <form
                className="p-4 bg-white border-t border-gray-200"
                id="message-form"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        id="message-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        <Send className="w-5 h-5"/>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
