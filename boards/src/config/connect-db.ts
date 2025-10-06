import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI!;

    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};