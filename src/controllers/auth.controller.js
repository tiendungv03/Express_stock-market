import * as svc from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const data = await svc.register(req.body);
    res.status(201).json({ message: "Registered", data });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await svc.login(req.body);
    res.json(data);
  } catch (e) {
    next(e);
  }
};
