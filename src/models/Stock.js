import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true, index: true },
    price: { type: Number, default: 0 },
    previousPrice: { type: Number, default: 0 },
    exchange: { type: String, default: "VN" },
    favorite: { type: Boolean, default: false },
  },
  { collection: "Stocks", timestamps: true }
);

stockSchema.index({ code: 1 });

export default mongoose.model("Stock", stockSchema);
