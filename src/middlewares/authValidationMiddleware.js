import { sessionsCollection, usersCollection } from "../database/db.js";


export const tokenValidation= async (req, res, next) => {
    const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");
    
      if (!token) {
        return res.sendStatus(401);
      }
    
      try{
        const sessionExist = await sessionsCollection.findOneAndDelete({token});
        if (!sessionExist){
            return res.sendStatus(401);
        };
    
        const user = await usersCollection.findOne({_id:sessionExist.userId});
        if (!user){
            return res.send(401);
        };
    
        res.locals.user = user;
    
      } catch(error){
        res.sendStatus(500);
      }
    }