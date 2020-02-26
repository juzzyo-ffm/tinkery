import React, {useEffect, useContext} from 'react';
import useMousePosition from '../hooks/useMousePosition';
import NotesContext from '../context/notes-context';

const Note = ({note}) => {

    const {dispatch} = useContext(NotesContext);

    const [pos] = useMousePosition();

    useEffect(() => {
        console.log('New note has been added');

        return () => {
            console.log('Note has been removed');
        };
    }, []);

    return (
        <div style={{cursor: 'pointer'}} id={note.title} onClick={() => dispatch(
            {
                type: 'REMOVE_NOTE',
                title: note.title
            })
        }
        >
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>{pos.x}, {pos.y}</p>
        </div>
    );
};

export {Note as default};