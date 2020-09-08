import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Header from './components/Header';

const App = () => {
    const [page, setPage] = useState('page1');
    const [component, setComponent] = useState(Page1);

    const onRouteChange = (route) => {
        setPage(route);
    };

    return (
        <div className="App">
            <img src={logo} width="100" height="100"/>
            <Header onRouteChange={onRouteChange}/>
            {page === 'page1' && <Page1 page={page}/>}
            {page === 'page2' && <Page2 page={page}/>}
            {page === 'page3' && <Page3 page={page}/>}
        </div>
    );
};

export default App;
