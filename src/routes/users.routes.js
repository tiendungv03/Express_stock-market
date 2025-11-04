import { Router } from "express";
import User from "../models/User.js";

const r = Router();

r.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ updatedAt: -1 });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

r.get("/:username", async (req, res, next) => {
  try {
    const u = await User.findOne(
      { username: req.params.username },
      { password: 0 }
    );
    if (!u) return res.status(404).json({ message: "Not found" });
    res.json(u);
  } catch (e) {
    next(e);
  }
});

export default r;
