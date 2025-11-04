import { body } from "express-validator";

export const createStockValidator = [
  body("name").notEmpty(),
  body("code").notEmpty(),
  body("price").optional().isNumeric(),
  body("previousPrice").optional().isNumeric(),
  body("favorite").optional().isBoolean(),
];
