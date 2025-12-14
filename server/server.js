import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import planRoutes from "./routes/planRoutes.js"

import connectDB from "./config/db.js"

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);

app.listen(5000, () => {
  console.log("Server started")
});
