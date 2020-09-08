const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

// login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// create users
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e.message);
    }

});

router.get('/users/me', auth, async (req, res) => {
    res.status(200).send(req.user);
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send(`Unable to find user with id ${_id}`);
        }
        res.status(200).send(user);

    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid update fields'});
    }
    try {

        const user = await User.findById(id);

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        if (!user) {
            return res.status(404).send(`Unable to find user with id ${id}`);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send(`Unable to find any users to delete with id ${req.params.id}`);
        }
        res.status(200).send(deletedUser);
    } catch (e) {
        res.send(500).send(e.message);
    }
});

module.exports = router;