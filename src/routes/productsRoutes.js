import { Router } from "express";
import { getProducts, registerProducts } from "../controllers/productsController.js";
import { validateProducts } from "../middlewares/productsMiddlewares.js";

const route = Router()

route.post("/produtos", validateProducts, registerProducts)
route.get("/produtos", getProducts)

export default route