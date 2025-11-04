import * as repo from "../repositories/stock.repository.js";
import Stock from "../models/Stock.js";

export const list = () => repo.listStocks();
export const detailById = (id) => Stock.findById(id).lean();
export const detailByCode = (code) =>
  Stock.findOne({ code: String(code).toUpperCase() }).lean();
export const detail = (id) => repo.getStockById(id);
export const create = (data) => repo.createStock(data);
export const update = (id, data) => repo.updateStock(id, data);
export const remove = (id) => repo.deleteStock(id);
