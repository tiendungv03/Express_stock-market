import Stock from "../models/Stock.js";

export const listStocks = () => Stock.find().sort({ updatedAt: -1 });
export const getStockById = (id) => Stock.findById(id);
export const createStock = (data) => Stock.create(data);
export const updateStock = (id, data) =>
  Stock.findByIdAndUpdate(id, data, { new: true });
export const deleteStock = (id) => Stock.findByIdAndDelete(id);
