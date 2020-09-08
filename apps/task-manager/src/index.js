const express = require('express');
const compression = require('compression');
require('./db/mongoose');
const userRouter = require('./routes/user-routes');
const taskRouter = require('./routes/tasks-routes');


const app = express();
// app.use((req, res, next) => {
//     res.status(503).send('Site is currently down, back soon.');
// });
app.use(compression());
app.use(express.json()); // sets up express to automatically parse incoming json
app.use(userRouter);
app.use(taskRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

process.env.AUTHKEY = 'maryhadalittlelamb';

