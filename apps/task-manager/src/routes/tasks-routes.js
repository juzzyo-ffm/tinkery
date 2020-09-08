const express = require('express');
const router = express.Router();

const Task = require('../models/task');


// create a task
router.post('/tasks', async (req, res) => {
    try {
        const task = await Task(req.body).save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const data = await Task.find({});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const taskFields = Object.keys(req.body);
    const validTasksProperties = ['description', 'completed'];
    const isValidOperation = taskFields.every((task) => {
        return validTasksProperties.includes(task);
    });
    if (!isValidOperation) {
        res.status(400).send({error: 'Invalid fields for updating a task.'});
    }
    try {
        // findById is used rather than findByIdAndUpdate,
        // as the latter will bypass any middleware we have, such as
        // that which implements bcrypt.
        const task = await Task.findById(id);
        taskFields.forEach((taskField) => {
            task[taskField] = req.body[taskField];
        });
        task.save();

        if (!task) {
            return res.status(404).send({error: `Unable to find task to update with id of ${id}`});
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(500).send({error: 'something went wrong while trying to update a task'});
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).send(`Unable to find any tasks to delete with id ${req.params.id}`);
        }
        res.status(200).send(deletedTask);
    } catch (e) {
        res.send(500).send(e.message);
    }
});

module.exports = router;
