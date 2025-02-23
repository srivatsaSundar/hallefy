import React from 'react';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <h2>Welcome, User {user?.username}</h2>
        </div>
    );
};

export default UserDashboard;
