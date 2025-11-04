import express from "express";
import cors from "cors";
import morgan from "morgan";
import stocksRouter from "./routes/stocks.routes.js";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/stocks", stocksRouter);

// Alias cũ (nếu FE đang gọi /users, /stocks)
app.use("/users", usersRouter);
app.use("/stocks", stocksRouter);

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use(errorHandler);

export default app;
