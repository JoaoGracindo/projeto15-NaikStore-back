import cors from "cors"
import express, { json } from "express"
import dotenv from "dotenv"
import productsRoutes from "./routes/productsRoutes.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

// Rotas de cadastro e requerimento dos produtos 
app.use(productsRoutes)

app.listen(5000, console.log("Server is running..."))