import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";
import cleaningRoutes from "./src/routes/cleaningRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HostelHub backend is running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend connected to backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/cleaning", cleaningRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });