import {Teacher} from "../models/teacherSchema.js";
import{ User }from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.json({
        success: false,
        message: "Logout And Then Login Again",
      });
    }

    const decode = jwt.verify(token, process.env.JWTSECRET);

    if (decode === "token expired") {
      return res.json({ success: false, message: "Token expired" });
    }
    if (!decode) {
      return res.json({ success: false, message: "User not verified" });
    }
     
     const user = await User.findById(decode.userId).select(`-password`) ?? await Teacher.findById(decode.userId).select(`-password`);

     if(!user){
      return res.json({
        success: false,
        message: "No User Found"
      })
     }
    req.user = user;
    next()
  } catch (error) {
    console.log("Protected Route Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
