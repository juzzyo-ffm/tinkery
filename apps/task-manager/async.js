const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) return reject('numbers must be positive');
            resolve(a + b);
        }, 2000);
    });
};


// const doWork = async () => {
//     // creating an async function allows us to use the await feature
//     // async functions return a promise, with the resolved value
//     // equal to the returned value
//     throw new Error('arrgg!!');
//
//     return 42;
//
// };


const doWork = async () => {
    const val = await add(1, 99);
    const val2 = await add(val, 5);
    const val3 = await add(val2, -9);
    return val3;
};

// example:
// call fetch on item
// run function on item
// update in db
// get number of records with updated value


//
// as doWork now returns a promise, we can handle it in the usual way
doWork()
    .then((v) => {
        console.log(v);
    })
    .catch((e) => console.log(e));

// otherwise
// doWork();

