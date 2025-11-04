import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, lowercase: true }, // optional
    password: { type: String, minlength: 6, required: true },
  },
  { collection: "Users", timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model("User", userSchema);
