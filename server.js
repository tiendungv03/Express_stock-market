import "dotenv/config";
import mongoose from "mongoose";
import connect from "./src/config/db.js";
import app from "./src/app.js";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const port = process.env.PORT || 3000;

if (!uri) {
  console.error("Missing MONGODB_URI (hoặc MONGO_URI) — kiểm tra .env");
  process.exit(1);
}

(async () => {
  try {
    await connect(uri);
    const server = app.listen(port, () =>
      console.log(`Server running on :${port}`)
    );

    process.on("SIGINT", async () => {
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error("MongoDB error:", err);
    process.exit(1);
  }
})();
