import React from 'react';


const Header = ({onRouteChange}) => {

    return (
        <div>
            <button onClick={() => onRouteChange('page1')}>Page1</button>
            <button onClick={() => onRouteChange('page2')}>Page2</button>
            <button onClick={() => onRouteChange('page3')}>Page3</button>
        </div>);
};

export default Header;
