import { Router } from "express";
import auth from "./auth.routes.js";
import users from "./users.routes.js";
import stocks from "./stocks.routes.js";

const router = Router();
router.get("/health", (req, res) => res.json({ status: "ok" }));

router.use("/auth", auth);
router.use("/users", users);
router.use("/stocks", stocks);

export default router;
