import React, {useContext} from 'react';
import UserContext from '../../context/user-context';

const User = ({id, name, username}) => {
    const {dispatch} = useContext(UserContext);

    return (
        <div key={id}>
            {username}, {name}, {id}
            <button onClick={() => dispatch({
                type: 'REMOVE_USER',
                username
            })}>remove
            </button>
        </div>
    );
};

export {User as default};