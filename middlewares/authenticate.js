import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchemas.js";
import "dotenv/config";
import { RequestError } from "../helpers/RequestError.js";

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401, "Unauthorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      throw RequestError(401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};
