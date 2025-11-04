import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import stockRoutes from "./routes/stockRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/users", userRoutes);

// ----- Kết nối MongoDB -----
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const port = process.env.PORT || 3000;

if (!uri) {
  console.error("Missing MONGODB_URI (hoặc MONGO_URI) — kiểm tra .env");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  console.log("MongoDB connected");

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
} catch (err) {
  console.error("MongoDB error:", err);
  process.exit(1);
}
