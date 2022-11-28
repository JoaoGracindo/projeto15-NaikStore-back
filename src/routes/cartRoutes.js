import { Router } from "express";
import {tokenValidation} from "../middlewares/authValidationMiddleware.js"
import {
    getCartProducts,
    addToCart,
    removeFromCart,
    checkout
} from "../controllers/cartControllers.js"


const route = Router()

route.use(tokenValidation)

route.get("/carrinho", getCartProducts);
route.post("/carrinho", addToCart);
route.delete("/carrinho", removeFromCart);
route.post("/checkout", checkout);

export default route;

