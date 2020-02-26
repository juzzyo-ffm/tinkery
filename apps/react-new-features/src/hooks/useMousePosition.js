import {useState, useEffect} from 'react';


// custom hook
const useMousePosition = () => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        console.log('adding event listener');
        const mouseMoveHandler = (e) => {
            setX(e.pageX);
            setY(e.pageY);
        };
        document.addEventListener('mousemove', mouseMoveHandler);

        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    const setPos = (xPos, yPos) => {
        setX(xPos);
        setY(yPos);
    };

    return [{x, y}, setPos];
};

export { useMousePosition as default };
