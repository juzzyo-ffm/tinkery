import React from 'react';
import Iframe from 'react-iframe'
// import logo from './logo.svg';
import './App.css';




function App() {


  return (
    <div className="App">
      <header className="App-header">Helllllo</header>
        <Iframe url="http://www.abc.net.au/life"
            position="absolute"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}/>

    </div>
  );
}

export default App;
