const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
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
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    // creating an instance method
    console.log(process.env);
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.AUTHKEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

userSchema.statics.findUserByCredentials = async (email, password) => {
    // statics are for model methods
    try {
        // try to find by email first,
        const user = await User.findOne({email});
        if (!user) {
            throw new Error('Unable to log in.');
        }

        // then separately verify the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to log in.');
        }
        // if all went well, return user
        return user;
    } catch (e) {
        throw new Error(`Something went osowrongo. ${e}`);
    }

};

// add middleware to hash passwords before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

var User = mongoose.model('User', userSchema);


module.exports = User;