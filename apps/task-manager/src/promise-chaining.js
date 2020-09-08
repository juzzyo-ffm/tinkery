require('./db/mongoose');
// const User = require('./models/user');
const Task = require('./models/task');

const deleteByIdAndCount = async (id) => {
    const result = await Task.findByIdAndDelete(id);
    const incompleteTasks = await Task.countDocuments({completed: false});
    return incompleteTasks;
};

deleteByIdAndCount('5e4fad199a8002a30fefcfdd')
    .then((result) => {
        console.log(result);
    })
    .catch((e) => {
        console.log(e);
    });