import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

export const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    const db = await mongoClient.connect()
    const userCollection = db.collection("users");
    const productCollection = db.collection("products")

} catch(err){
    console.log(err)
}
