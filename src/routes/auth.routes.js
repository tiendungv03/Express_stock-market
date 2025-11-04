import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validations/auth.validation.js";

const r = Router();

// REGISTER by username
r.post("/register", registerValidator, validate, async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const existed = await User.findOne({ username });
    if (existed)
      return res.status(409).json({ message: "Username already used" });

    const user = await User.create({ username, password, email });
    res
      .status(201)
      .json({
        id: user._id,
        username: user.username,
        email: user.email || null,
      });
  } catch (e) {
    next(e);
  }
});

// LOGIN by username
r.post("/login", loginValidator, validate, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { sub: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email || null,
      },
    });
  } catch (e) {
    next(e);
  }
});

export default r;
