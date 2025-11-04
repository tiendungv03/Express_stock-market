import jwt from "jsonwebtoken";
import { createUser, findByEmail } from "../repositories/user.repository.js";

export async function register(payload) {
  const existed = await findByEmail(payload.email);
  if (existed) {
    const err = new Error("Email already used");
    err.status = 409;
    throw err;
  }
  const user = await createUser(payload);
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
}

export async function login({ email, password }) {
  const user = await findByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }
  const accessToken = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
  return {
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
}
