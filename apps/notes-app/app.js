#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const notes = require('./notes');

const package = fs.readFileSync('./package.json', 'utf8');
yargs.version(JSON.parse(package).version);


// add, remove, read, list
yargs.command({
    command: 'add',
    describe: 'adds a new note',
    builder: {
        title: {
            describe: 'the title of the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'the body of the note',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv);
    }
});

yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'The title of the note to remove',
            demand: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title: {
            describe: 'the title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }

});

yargs.command({
    command: 'list',
    describe: 'Lists all notes',
    handler() {
        notes.listNotes();
    }
});

yargs.parse();
