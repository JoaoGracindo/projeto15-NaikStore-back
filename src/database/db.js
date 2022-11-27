import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);


try {
    await mongoClient.connect();
  } catch (err) {
    console.log(err);
  }
  
  const db = mongoClient.db("naik")
  export const usersCollection = db.collection("users");
  export const sessionsCollection = db.collection("sessions");
  const productsCollection = db.collection("products");
  export{
    productsCollection
};

