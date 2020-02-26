import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import NoteApp from './components/NoteApp';


ReactDOM.render(<NoteApp/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
const App = (props) => {
    const {defaultCount, defaultTextLabel} = props;
    const [count, setCount] = useState(defaultCount);
    const [textLabel, setTextLabel] = useState(defaultTextLabel);

    useEffect(() => {
        // combination of componentDidMount and componentDidUpdate
        console.log('useEffect ran');
        document.title = count;

    }, [count]);
    return (
        <div>
            <p>The current {textLabel} is {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(count - 1)}>-1</button>
            <button onClick={() => setCount(defaultCount)}>reset</button>
            <input value={textLabel} onChange={(e) => setTextLabel(e.target.value)}/>
        </div>
    );
};

App.defaultProps = {
    defaultCount: 0,
    defaultTextLabel: 'score'
};
*/

// class based
// stateless functional

// hook is a function, that lets us tap into a feature like state or lifecycle methods
// can create own hooks
// start with built in hooks
// useState

