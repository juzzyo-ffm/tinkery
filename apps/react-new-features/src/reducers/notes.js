const notesReducer = (notes, action) => {
    switch (action.type) {
    case 'POPULATE_NOTES':
        return action.notes;
    case 'ADD_NOTE':
        return notes = [
            ...notes,
            action.note
        ];
    case 'REMOVE_NOTE':
        return notes.filter((note) => note.title !== action.title);
    default:
        return notes;
    }
};

export {notesReducer as default};