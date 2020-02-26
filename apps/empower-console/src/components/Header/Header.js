import React, {useContext} from 'react';
import UserContext from '../../context/user-context';

const Header = () => {
    const {users} = useContext(UserContext);

    // todo: get current user from context
    return (
        <header>Current user: </header>
    );
};

export {Header as default};