import { Router } from "express";
import * as ctrl from "../controllers/stocks.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { createStockValidator } from "../validations/stock.validation.js";
import { validate } from "../middlewares/validation.middleware.js";

const r = Router();

// Public
r.get("/", ctrl.list);
r.get("/:code", ctrl.detail);

// Auth (không có role)
r.post("/", requireAuth, createStockValidator, validate, ctrl.create);
r.put("/:id", requireAuth, ctrl.update);
r.delete("/:id", requireAuth, ctrl.remove);

export default r;
