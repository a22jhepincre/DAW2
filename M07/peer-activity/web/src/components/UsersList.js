import React from 'react';

const UsersList = ({ users, selectedUser, onUserSelect }) => {
    return (
        <div>
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => onUserSelect(user)}
                    className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                        selectedUser === user.id ? 'bg-gray-100' : ''
                    }`}
                    data-user-id={user.id}
                >
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4 flex-1">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UsersList;
