import {Router} from 'express';
import {SignIn, SignUp, LogOut} from "../controllers/userControllers.js";
import { userValidation, userRegisterValidation, LogOutValidation} from "../middlewares/userValidationMiddlewares.js";

const router = Router();

router.post("/sign-in", userValidation, SignIn);
router.post("/sign-up", userRegisterValidation, SignUp);
router.post("/log-out", LogOutValidation, LogOut);

export default router;