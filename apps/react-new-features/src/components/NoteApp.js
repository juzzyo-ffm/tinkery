import React, {useReducer, useEffect} from 'react';
// NoteApp
import notesReducer from '../reducers/notes';
import useMousePosition from '../hooks/useMousePosition';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NotesContext from '../context/notes-context';

const NoteApp = () => {
    // get from local storage
    const [notes, dispatch] = useReducer(notesReducer, []);
    // const [notes, setNotes] = useState([]);

    const [pos] = useMousePosition();


    useEffect(() => {
        const notesData = JSON.parse(localStorage.getItem('notes'));

        if (notesData) {
            dispatch({type: 'POPULATE_NOTES', notes: notesData});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);


    return (
        <NotesContext.Provider value={{notes, dispatch}}>
            <h1>Notes {pos.x}, {pos.y}</h1>
            <NoteList />
            <NoteForm />
        </NotesContext.Provider>
    );
};

export {NoteApp as default};