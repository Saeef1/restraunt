// /app/lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// ✅ Singleton cache object
const mongooseCache = {
  conn: null as typeof mongoose | null,
  promise: null as Promise<typeof mongoose> | null,
};

export const connectDB = async () => {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongooseCache.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    mongooseCache.promise = null;
    throw error;
  }

  return mongooseCache.conn;
};
