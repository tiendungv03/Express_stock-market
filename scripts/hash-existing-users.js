import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error("Missing MONGODB_URI");
  process.exit(1);
}

const run = async () => {
  await mongoose.connect(uri);
  const col = mongoose.connection.db.collection("Users");
  const cursor = col.find({ password: { $exists: true } });

  let updated = 0;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    const pwd = doc.password || "";
    // Bỏ qua nếu có vẻ đã hash (60 ký tự, bắt đầu $2)
    if (typeof pwd === "string" && pwd.length >= 50 && pwd.startsWith("$2"))
      continue;

    const hashed = await bcrypt.hash(pwd, 10);
    await col.updateOne({ _id: doc._id }, { $set: { password: hashed } });
    updated++;
  }
  console.log(`Updated users: ${updated}`);
  await mongoose.connection.close();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
