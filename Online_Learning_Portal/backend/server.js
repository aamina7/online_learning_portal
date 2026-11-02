import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import assignmentRoutes from "./routes/assignments.js";
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (req,res) => res.json({message:"Online Learning Portal API is running"}));
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignments", assignmentRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => console.log("Backend: http://localhost:5000"));
}).catch(err => { console.error("MongoDB connection error:", err.message); process.exit(1); });
