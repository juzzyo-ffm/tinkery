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
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
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
userSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        // creating an instance method
        const user = this;
        const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTHKEY);
        user.tokens = user.tokens.concat({ token });
        yield user.save();
        return token;
    });
};
userSchema.statics.findUserByCredentials = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // statics are for model methods
    try {
        // try to find by email first,
        const user = yield User.findOne({ email });
        if (!user) {
            throw new Error('Unable to log in.');
        }
        // then separately verify the password
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Unable to log in.');
        }
        // if all went well, return user
        return user;
    }
    catch (e) {
        throw new Error(`Something went osowrongo. ${e}`);
    }
});
// add middleware to hash passwords before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt.hash(user.password, 10);
        }
        next();
    });
});
const User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map