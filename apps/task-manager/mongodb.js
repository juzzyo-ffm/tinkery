const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    // connection is async
    if (error) {
        return console.log('Something went wrong with the db connection: ', error);
    }

    // get reference to database
    const db = client.db(databaseName);


    // delete
    db.collection('users')
        .deleteMany({age: 46})
        .then((result) => console.log(result))
        .catch((error) => console.log(error));

    // update
    // db.collection('users').updateOne(
    //     {_id: new ObjectID('5e4e56106cf76a83ec03c9fa')},
    //     {$inc: {age: 1}}
    // )
    //     .then((data) => console.log(data.matchedCount, data.modifiedCount))
    //     .catch((error) => console.log(error));

    // // update many
    // db.collection('tasks').updateMany(
    //     {completed: false},
    //     {$set: {completed: true}}
    // )
    //     .then((data) => console.log(data.matchedCount, data.modifiedCount))
    //     .catch((error) => console.log(error));


    // db.collection('users').findOne({name: 'jenny'}, (error, doc) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }
    //
    //     console.log(doc);
    //
    // });

    // find returns a cursor, rather than the results themselves.
    // db.collection('tasks').find({completed: false}, {projection: {_id: 0}}).toArray((error, tasks) => {
    //     console.log(tasks);
    // });

    // sometimes we just want to count the matching results
    // db.collection('tasks').find({completed: false}).count((e, n) => {
    //     console.log(n);
    // });

    // create collection for distinct items, like users,
    // db.collection('users').insertOne({
    //     name: 'justin',
    //     age: 46
    // }, {}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user: ', error);
    //     }
    //
    //     console.log(result.ops);
    //
    // });

    // db.collection('users').insertMany([
    //     {name: 'jenny', age: 22},
    //     {name: 'gunter', age: 22},
    //     {name: 'harkonen', age: 22}
    // ], {}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert multiple docs');
    //     }
    //     console.log(result.ops);
    // });


    // challenge: add three new documents with description and status to a tasks collection
    // db.collection('tasks').insertMany([
    //     {description: 'mow the lawn', completed: false},
    //     {description: 'trim the hedges', completed: false},
    //     {description: 'eat a hotdog', completed: false}
    // ], {}, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to add tasks');
    //     }
    //     console.log(result.ops);
    // });


});




