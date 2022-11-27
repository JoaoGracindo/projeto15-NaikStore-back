import cors from "cors"
import express, { json } from "express"
import dotenv from "dotenv"
dotenv.config()

import userRoutes from "./routes/userRoutes.js";

const app = express()
app.use(json())
app.use(cors())

app.use(userRoutes);

app.listen(5000, console.log("Server is running..."))