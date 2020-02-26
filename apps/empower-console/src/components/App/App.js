import React, {useReducer, useEffect} from 'react';
import UserContext from '../../context/user-context';
import Header from '../Header/Header';
import UserInfo from '../UserInfo/UserInfo';
import BatteryInfo from '../BatteryInfo/BatteryInfo';
import usersReducer from '../../reducers/users';

import './app.css';

const App = () => {

    const [users, dispatch] = useReducer(usersReducer, []);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('users'));

        if (userData) {
            dispatch({type: 'POPULATE_USERS', users: userData});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <UserContext.Provider value={{users, dispatch}}>
            <main>
                <Header/>
                <BatteryInfo/>
                <div className='info'>info</div>
                <UserInfo/>
                <div className='graph'>graph</div>
                <footer>Footer</footer>
            </main>
        </UserContext.Provider>
    );
};

export {App as default};