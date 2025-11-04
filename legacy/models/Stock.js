const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: String,
  code: String,
  price: Number,
  previousPrice: Number,
  exchange: String,
  favorite: Boolean,
});

module.exports = mongoose.model("Stock", stockSchema, "Stocks");
