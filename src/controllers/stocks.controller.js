import * as svc from "../services/stocks.service.js";
import mongoose from "mongoose";

export const list = async (req, res, next) => {
  try {
    res.json({ data: await svc.list() });
  } catch (e) {
    next(e);
  }
};

export const detail = async (req, res, next) => {
  try {
    const v = req.params.code;
    console.log("v", v);
    const isObjectId = mongoose.Types.ObjectId.isValid(v);
    const data = isObjectId
      ? await svc.detailById(v)
      : await svc.detailByCode(String(v).toUpperCase().trim());
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json({ data });
  } catch (e) {
    next(e);
  }
};

export const create = async (req, res, next) => {
  try {
    res.status(201).json({ data: await svc.create(req.body) });
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res, next) => {
  try {
    res.json({ data: await svc.update(req.params.id, req.body) });
  } catch (e) {
    next(e);
  }
};

export const remove = async (req, res, next) => {
  try {
    await svc.remove(req.params.id);
    res.json({ message: "Deleted" });
  } catch (e) {
    next(e);
  }
};
