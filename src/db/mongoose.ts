// <mongoose.ts>
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

// Ensure the cache is initialized on the global object
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase(): Promise<typeof mongoose> {
  // If we already have a connection, return it
  if (cached!.conn) return cached!.conn;

  // If we don't have a promise yet, create one
  if (!cached!.promise) {
    const opts = { bufferCommands: false };

    cached!.promise = mongoose.connect(MONGODB_URL!, opts).then((m) => {
      console.log("✅ MongoDB Connected via Mongoose");
      return m;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null; // Reset promise on error so we can try again
    throw e;
  }

  return cached!.conn;
}

export default connectToDatabase;