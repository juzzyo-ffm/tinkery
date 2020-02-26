const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model('User', {
    name: {
        type: String,
        required: [true, 'why not bacon?'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email, yo'],
        trim: true,
        index: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is unvalid, er, invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(num) {
            if (num < 0) {
                throw new Error(`I don't believe you`);
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password? rly?');
            }
            // if (value.length < 6) {
            //     throw new Error('Password to shrt');
            // }
        }
    }
});


// new User({name: 'Juzzy', age: 46})
// const userOb = {
//     name: 'justin',
//     email: 'justin@BLARG.com',
//     password: 'passwords',
//     age: 8
// };
// new userModel(userOb)
//     .save()
//     .then((result) => console.log(result))
//     .catch((error) => console.log(error.message));

module.exports = User;