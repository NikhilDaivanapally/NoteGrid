import mongoose, { Schema } from "mongoose";

const UserQuerySchema = new Schema(
  {
    // Only define the fields you need for your custom queries
    name: String,
    email: String,
    banned: Boolean,
    role: String,
    createdAt: Date,
  },
  {
    collection: "user", // <--- THIS MUST MATCH BETTER AUTH COLLECTION NAME
    strict: false, // Allows you to read fields Better Auth adds automatically
  }
);

export const UserQuery =
  mongoose.models.UserQuery || mongoose.model("UserQuery", UserQuerySchema);
