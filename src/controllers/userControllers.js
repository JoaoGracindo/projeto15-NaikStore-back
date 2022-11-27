import { sessionsCollection, usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export const SignIn = async (req, res) => {
    const user = res.locals.user;
    const token = uuid();
    const userSession = {token, userId: user._id};

    try {
        await sessionsCollection.insertOne(userSession);
        res.status(201).send({token});
    } catch (error){
        res.sendStatus(500);
    }
}


export const SignUp = async (req, res) => {
    const user = res.locals.user;
    const passwordHash = bcrypt.hashSync(user.password, 10);
    const userRegister = {...user, password:passwordHash};

    try {
        await usersCollection.insertOne(userRegister)
        res.status(201).send('OK');
    } catch(error){
        console.log("controller");
        res.sendStatus(500);
    }
}

export const LogOut = async (req, res) => {
    const token = res.locals.token;

    try {
        const tokenOk = await sessionsCollection.findOne({token});
        if (!tokenOk){
            return res.sendStatus(401);
        }
        await sessionsCollection.deleteOne({token})
        res.sendStatus(201);
    } catch (error){
        res.sendStatus(500);
    }
}
