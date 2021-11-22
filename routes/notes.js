const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

// Route for adding a new one
notes.post('/', (req, res) => {
    if (req.body) {

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully.');
    } else {
        res.json('There was an error while adding a note.');
    }
});

// Route for removing a specific note by id
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of notes without the ID provided
      const finalNote = json.filter((note) => note.id !== noteId);

      // Save that array to the file
      writeToFile('./db/db.json', finalNote);

      // Respond to the DELETE request
      res.json(`${noteId} has been deleted from the database`);
    });
});


module.exports = notes;