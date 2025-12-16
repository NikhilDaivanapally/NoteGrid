import { betterAuth } from "better-auth";
import connectToDatabase from "../mongoose";
import mongoose from "mongoose";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Db } from "mongodb";

await connectToDatabase();

const client = mongoose?.connection.getClient();
const db = mongoose.connection.db as Db;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
});
