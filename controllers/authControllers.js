//import authService from "../services/authServices.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestError } from "../helpers/RequestError.js";
import { User } from "../schemas/userSchemas.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const payload = {
    email: email,
  };
  res.status(201);
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    token,
  });
  res.status(201).json({ email: result.email, token: result.token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    message: "Logout success",
  });
};

export const current = (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};
