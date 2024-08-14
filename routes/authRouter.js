import express from "express";
import {
  register,
  login,
  logout,
  current,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { cntrlWrapper } from "../helpers/cntrlWrapper.js";
import { schemas } from "../schemas/userSchemas.js";
import { validateBody } from "../middlewares/validateBody.js";

const authRouter = express.Router();

authRouter.post(
  "/signUp",
  validateBody(schemas.registerSchems),
  cntrlWrapper(register)
);

authRouter.post(
  "/signIn",
  validateBody(schemas.loginSchema),
  cntrlWrapper(login)
);

authRouter.get("/logOut", authenticate, cntrlWrapper(logout));

authRouter.get("/current", authenticate, cntrlWrapper(current));

export default authRouter;
