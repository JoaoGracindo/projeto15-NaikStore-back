import { Router } from "express";
import { getProducts, registerProducts, getProductsType } from "../controllers/productsController.js";
import { validateProducts } from "../middlewares/productsMiddlewares.js";

const route = Router()

route.post("/produtos", validateProducts, registerProducts)
route.get("/produtos", getProducts)
route.get("/produtos/:category", getProductsType)

export default route