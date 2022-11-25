import cors from "cors"
import express, { json } from "express"
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(json())
app.use(cors())

app.listen(5000, console.log("Server is running..."))