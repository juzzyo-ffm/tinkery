const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils/string.js');

const saveNotes = (notes) => {
    fs.writeFileSync('./notes.json', JSON.stringify(notes));
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json');
        const data = JSON.parse(dataBuffer.toString());
        return data;
    } catch (e) {
        console.log(chalk.red('No notes exist yet, creating empty array.'));
        return [];
    }

};

const listNotes = () => {

    debugger

    const notes = loadNotes();
    if (notes) {
        console.log(chalk.blue('Listing all notes:'));
        notes.forEach(note => {
            console.log(note.title);
        });
    }
};

const addNote = (argv) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => {
        return note.title === argv.title;
    });


    if (duplicateNotes.length === 0) {
        try {
            notes.push({
                title: utils.titleCase(argv.title),
                body: argv.body
            });
            saveNotes(notes);
            console.log(chalk.blue('Saved new note: ', argv.title));
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log(chalk.red('Note title already taken'));
    }
};

const readNote = (title) => {
    const notes = loadNotes();
    notes.forEach(note => {
        if (title === note.title) {
            console.log(chalk.blue('Reading note:'));
            console.log(`Title: ${note.title}`);
            console.log(`Body: ${note.body}`);
        }
    });
};

const removeNote = (title) => {
    const notes = loadNotes();
    if (notes && notes.length) {
        for (let i = 0, n = notes.length - 1; i < n; i++) {
            if (title === notes[i].title) {
                console.log(chalk.blue(`Removing note: ${title}`));
                notes.splice(i, 1);
            }
        }
        saveNotes(notes);
    }
};

module.exports = {
    addNote,
    listNotes,
    readNote,
    removeNote
};