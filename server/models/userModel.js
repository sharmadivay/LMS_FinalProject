import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      
    },
    country:{
      type: String,
      default: "India"
    },

    enrolledCourses: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }]
  },
  { timestamps: true }
);

export const User = mongoose.model("User",userSchema);