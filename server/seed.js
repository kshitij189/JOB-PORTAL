import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // Clear previous data (optional)
    await Job.deleteMany();
    await Company.deleteMany();
    await User.deleteMany();

    // Create dummy user
    const user = await User.create({
      fullname: "Test Recruiter",
      email: "recruiter@example.com",
      phoneNumber: 9999999999,
      password: "hashedpassword", // You can hash using bcrypt if needed
      role: "recruiter"
    });

    // Create company for that user
    const company = await Company.create({
      name: "Techverse Inc",
      description: "A leading tech company.",
      location: "Bangalore",
      website: "https://techverse.io",
      logo: "https://via.placeholder.com/100",
      userId: user._id
    });

    // Create some job posts
    const jobs = [
      {
        title: "MERN Stack Developer",
        description: "Develop full-stack web apps.",
        requirements: ["MongoDB", "Express", "React", "Node.js"],
        salary: 700000,
        experienceLevel: "Mid-level",
        location: "Remote",
        jobType: "Full-Time",
        position: 2,
        company: company._id,
        created_by: user._id
      },
      {
        title: "Backend Engineer",
        description: "Build scalable APIs and services.",
        requirements: ["Node.js", "Express", "MongoDB"],
        salary: 900000,
        experienceLevel: "Senior",
        location: "Delhi",
        jobType: "Full-Time",
        position: 1,
        company: company._id,
        created_by: user._id
      }
    ];

    await Job.insertMany(jobs);
    console.log("Seed data inserted successfully");
    process.exit();
  } catch (err) {
    console.error("Seeding failed", err.message);
    process.exit(1);
  }
};

seedDatabase();
