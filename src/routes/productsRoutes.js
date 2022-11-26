import { Router } from "express";
import { registerProducts } from "../controllers/productsController.js";
import { validateProducts } from "../middlewares/productsMiddlewares.js";

const route = Router()



route.post("/produtos", validateProducts, registerProducts)


export default route