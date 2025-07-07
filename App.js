  import dotenv from "dotenv";
  dotenv.config();
  import express from "express";
  import mongoose from "mongoose";
  import authRouter from "./src/routes/auth.js";
  import router from "./src/routes/eventRoute.js";
  import cors from "cors";
import formRouter from "./src/routes/formRoute.js";

  const app = express();
  app.use(express.json());
  const port = 3001;

  
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true           
}));
  app.use("/auth", authRouter);
  app.use("/events",router);
  app.use("/bookings",formRouter);

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("MongoDB connection error:", err));

  app.get("/", (req, res) => {
    res.send("Backend is working!");
  });

  app.listen(port, () => {
    console.log("Port is running on", port);
  });