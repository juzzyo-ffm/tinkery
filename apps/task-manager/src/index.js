const express = require('express');
const {ObjectID} = require('mongodb');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // sets up express to automatically parse incoming json

// create users
app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((data) => {
        res.status(200).send(data);
    }).catch((e) => {
        res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
    // User.find({_id: ObjectID(req.params.id)})
    const _id = req.params.id;

    User.findById(_id)
        .then((user) => {
            console.log(user);
            if (!user) {
                return res.status(404).send(`Unable to find user with id ${_id}`);
            }
            res.status(200).send(user);
        })
        .catch((e) => {
            res.status(500).send(e.message);
        });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});