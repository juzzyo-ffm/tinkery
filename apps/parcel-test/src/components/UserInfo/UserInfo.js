import React from 'react';
import UserList from '../UserList/UserList';
import AddUserForm from '../AddUserForm/AddUserForm';

// show a list of users
const UserInfo = () => {

    return (
        <div className='users'>
            <h2>User Info</h2>
            <UserList/>
            <AddUserForm/>
        </div>
    );
};

export {UserInfo as default};

