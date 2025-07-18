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

// ✅ Load env file based on environment
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config(); // defaults to .env
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup for dev and production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://job-portal-5xbb.onrender.com' 
    : 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/chatboat", chatboatRoutes);

// ✅ Root Route (for Render or health check)
app.get("/", (req, res) => {
  res.send("Job Portal Backend is running successfully!");
});

// ✅ Startup
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
