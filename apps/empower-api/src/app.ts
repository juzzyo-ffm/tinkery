import express = require("express");
import compression = require("compression");

require('./db/mongoose');
import userRouter = require("./routers/user-router");


// Our Express APP config
const app = express();
app.use(compression());
app.use(express.json());
app.use(userRouter);

app.set("port", process.env.PORT || 3000);


// API Endpoints
app.get("/status", (req, res) => {
    res.status(200).send({status: 'ok'});
});

// export our app
export default app;
