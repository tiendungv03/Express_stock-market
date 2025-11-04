import { body } from "express-validator";

export const registerValidator = [
  body("username").notEmpty().isString(),
  body("password").isLength({ min: 6 }),
  body("email").optional().isEmail(),
];

export const loginValidator = [
  body("username").notEmpty().isString(),
  body("password").notEmpty(),
];
