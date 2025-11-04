import * as svc from "../services/users.service.js";

export const list = async (req, res, next) => {
  try {
    const data = await svc.listAll();
    res.json({ data });
  } catch (e) {
    next(e);
  }
};
