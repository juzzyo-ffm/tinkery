import jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express';
import User, {UserSchemaInterface} from "../models/user";

interface DecodedInterface {
    _id: string,
    iat: number
}

const auth = async (req: Request & { user: UserSchemaInterface }, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded: any = jwt.verify(token, process.env.AUTHKEY);
        console.log('decoded:', typeof decoded);
        const user: UserSchemaInterface = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({error: 'please authenticate'});
    }
};


module.exports = auth;