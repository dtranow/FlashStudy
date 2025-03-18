import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [8, "Username must be atleast 8 characters long"],
    maxlength: [18, "Username must be at most 18 characters"],
    trim: true,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Usename can only contain letters, numbers, and underscores",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be atleast 8 characters long"],
    maxlength: 62,
    trim: true,
    match: [
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    maxlength: 25 
  },
  role: {
    type: String, 
    enum: ["user", "admin"], 
    default: "user"
  }
});

const User = mongoose.model("User", userSchema);

export default User;
