let mongoos = require('mongoose');


mongoos.connect('mongodb://127.0.0.1:27017/empower-api', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err: any) => {
        if (err) {
            return console.log('error connecting to db: ', err)
        }
        console.log("Successfully connected to db..."
        );
    });
