import cors from "cors"
import express, { json } from "express"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import productsRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())


app.use(userRoutes);
// Rotas de cadastro e requerimento dos produtos 
app.use(productsRoutes)

app.use(cartRoutes)


app.listen(process.env.PORT, console.log(`Server is running ins port ${process.env.PORT}...`))