import React, {Fragment, useState, useContext} from 'react';
import NotesContext from '../context/notes-context';

const NoteForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {dispatch} = useContext(NotesContext);

    const addNote = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_NOTE', note: {title, body}
        });
        setTitle('');
        setBody('');
    };

    return (
        <Fragment>
            <p>Add note:</p>
            <form onSubmit={addNote}>
                <input style={{display: 'block'}}
                       onChange={(e) => setTitle(e.target.value)}/>
                <textarea rows={6} cols={60} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>Add note</button>
            </form>
        </Fragment>
    );
};

export {NoteForm as default};