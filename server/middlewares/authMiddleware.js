// middlewares/authMiddleware.js

import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Teacher } from "../models/teacherSchema.js";

export const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming role comes from token payload
    if (decoded.role === "user") {
      req.user = await User.findById(decoded.id).select("-password");
    } else if (decoded.role === "teacher") {
      req.user = await Teacher.findById(decoded.id).select("-password");
    } else if (decoded.role === "admin") {
      req.user = await Admin.findById(decoded.id).select("-password");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token not valid" });
  }
};

// Optional: Admin-only middleware
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};