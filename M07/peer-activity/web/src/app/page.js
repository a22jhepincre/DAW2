'use client'

import React, {useState, useEffect} from 'react';
import {MessageSquare} from 'lucide-react';
import UsersList from '../components/UsersList';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
    const users = [
        {
            id: '1',
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        },
        {
            id: '2',
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        }
    ];
    const [selectedUser, setSelectedUser] = useState(null);
    const onUserSelected = (user)=>{
        setSelectedUser(user)
    }

    const onBack = ()=>{
        setSelectedUser(null);
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
                <UsersList users={users} selectedUser={selectedUser} onUserSelect={onUserSelected}/>
            </div>

            {/* Ventana de chat */}
            <div
                className={`${
                    !selectedUser ? 'hidden' : 'flex flex-col flex-1'
                } bg-gray-50`}
                id="chat-container"
            >
                <ChatWindow selectedUser={selectedUser} onBack={onBack}/>

            </div>
        </div>
    );
}
