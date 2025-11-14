import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import chatboatRoutes from "./routes/chatboatroutes.js";

// Load env
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ⭐ FIXED CORS — allow both localhost + production FE
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-5xbb.onrender.com"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chatboat", chatboatRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Job Portal Backend is running successfully!");
});

// Start Server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
