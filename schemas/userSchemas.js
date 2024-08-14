import { Schema, model } from "mongoose";
import Joi from "joi";
import { hendleSave } from "../helpers/handleSave.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: { type: String },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);
const registerSchems = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
});
const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email(),
});
const EmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
userSchema.post("save", hendleSave);

export const User = model("user", userSchema);

export const schemas = {
  registerSchems,
  loginSchema,
  EmailSchema,
};
