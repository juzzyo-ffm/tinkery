import React, {useContext, useState} from 'react';
import UserContext from '../../context/user-context';

const AddUserForm = () => {
    const {dispatch} = useContext(UserContext);
    const [username, setUsername] = useState();
    const [name, setName] = useState();

    const addUser = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_USER',
            user: {id: username, username, name}
        });
        setUsername('');
        setName('');
    };

    //
    return (
        <form onSubmit={addUser}>
            <input onChange={(e) => {
                setUsername(e.target.value);
            }} value={username} placeholder="username"/>
            <input onChange={(e) => {
                setName(e.target.value);
            }} value={name} placeholder="name"/>
            <button>Add user</button>
        </form>
    );
};

export {AddUserForm as default};