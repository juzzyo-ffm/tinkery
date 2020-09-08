"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression");
require('./db/mongoose');
const userRouter = require("./routers/user-router");
// Our Express APP config
const app = express();
app.use(compression());
app.use(express.json());
app.use(userRouter);
app.set("port", process.env.PORT || 3000);
// API Endpoints
app.get("/status", (req, res) => {
    res.status(200).send({ status: 'ok' });
});
// export our app
exports.default = app;
//# sourceMappingURL=app.js.map