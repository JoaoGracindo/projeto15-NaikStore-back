import cors from "cors"
import express, { json } from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
dotenv.config()

//"mongodb+srv://mymovieserver:6Slrau3UKuou1jIT@cluster0.1lcgweb.mongodb.net/?retryWrites=true&w=majority"

const app = express()
app.use(express.json())
app.use(cors())


app.use(userRoutes);
// Rotas de cadastro e requerimento dos produtos 
app.use(productsRoutes)

app.use(cartRoutes)


app.listen(5000, console.log("Server is running..."))