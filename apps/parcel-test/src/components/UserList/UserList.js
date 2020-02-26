import React, {useContext} from 'react';
import UserContext from '../../context/user-context';
import User from '../User/User';

// show a list of users
const UserList = () => {
    const {users} = useContext(UserContext);
    console.log('users::', users);

    return users.map((user) => (
        <User key={user.id} {...user} />
    ));
};

export {UserList as default};

