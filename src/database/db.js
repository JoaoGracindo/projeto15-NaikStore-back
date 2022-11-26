import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    mongoClient.connect()
} catch(error){
    console.log(error)
}

const db = mongoClient.db("naik")
const productsCollection = db.collection("products")

export{
    productsCollection
}


