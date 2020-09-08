"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = require("express");
const user_1 = require("../models/user");
const auth = require('../middleware/auth');
const router = express_1.Router();
// login user
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findUserByCredentials(req.body.email, req.body.password);
        const token = yield user.generateAuthToken();
        res.status(200).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e.message);
    }
}));
// create users
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.default(req.body);
        const token = yield user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e.message);
    }
}));
router.get('/users/me', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(req.user);
}));
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    try {
        const user = yield user_1.default.findById(_id);
        if (!user) {
            return res.status(404).send(`Unable to find user with id ${_id}`);
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
}));
router.patch('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update fields' });
    }
    try {
        const user = yield user_1.default.findById(id);
        updates.forEach((update) => user[update] = req.body[update]);
        yield user.save();
        if (!user) {
            return res.status(404).send(`Unable to find user with id ${id}`);
        }
        res.status(200).send(user);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
}));
router.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send(`Unable to find any users to delete with id ${req.params.id}`);
        }
        res.status(200).send(deletedUser);
    }
    catch (e) {
        res.send(500).send(e.message);
    }
}));
module.exports = router;
//# sourceMappingURL=user-router.js.map