import { ObjectId } from "mongodb";
import { sessionsCollection, usersCollection } from "../database/db.js";


export const tokenValidation = async (req, res, next) => {
    const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");
      console.log(req)
      if (!token) {
        
        return res.sendStatus(401);
        
      }
    
      try{
        const sessionExist = await sessionsCollection.findOne({token});
        const id = sessionExist.userId;
        
        if (!sessionExist){
          
            return res.sendStatus(401);
            
        };
        
        
        
        const user = await usersCollection.findOne({_id:ObjectId(id)});
        
        if (!user){
          
            return res.send(401);
        };

        res.locals.user = user;
        
        next()

        
      
      } catch(error){
        res.sendStatus(500);
      }

      
    }