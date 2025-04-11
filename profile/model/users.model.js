import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"], 
      trim: true, 
    },
    email: {
      type: String,
      required: [true, "Email is required"], 
      trim: true, 
    },
    password: {
      type: String,
      required: [true, "Password is required"], 
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create the model
export default mongoose.model("User", userSchema);
