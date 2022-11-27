import {sessionsCollection, usersCollection } from "../database/db.js";
import { userSchema, userRegisterSchema } from "../models/userModels.js";
import bcrypt from 'bcrypt';

export const userRegisterValidation = (req, res, next)=>{
    const user = req.body;

    const {error}= userRegisterSchema.validate(user, { abortEarly: false });

    if(error){
        console.log(error);
        return res.sendStatus(400);
    };

    res.locals.user = user;
    next();
};

export const userValidation = async (req, res, next)=>{
    const user = req.body;
    const {error} = userSchema.validate(user);

    if(error){
        console.log("joi");
        return res.sendStatus(400);
    };

    try{
        const userExist = await usersCollection.findOne({ email: user.email });
        if(!userExist){
            return res.sendStatus(401);
        };

        const passwordEquals = bcrypt.compareSync(user.password, userExist.password);
        if(!passwordEquals){
            return res.sendStatus(401)
        };

        res.locals.user = userExist;
    }catch(error){
        console.log("validation");
        res.sendStatus(500);
    }

    next();
};

export const LogOutValidation = async (req, res, next)=>{
    const {token} = req.body;

    try{
        const tokenExist = await sessionsCollection.findOne({token});

        if (!tokenExist){
            return res.sendStatus(401)
        }
        res.locals.token = token;

    } catch (error){
        res.sendStatus(500)
    }

    next();
};