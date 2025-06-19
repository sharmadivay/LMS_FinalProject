import {User} from "../models/userModel.js"
export const getMeController = async (req,res) => {
    try {
        const user = req.user
        const role = await   User.findById(user.id) ? "student" : "teacher" ;
        res.json({
            success: true,
            message: "User Found",
            user,
            role
        })
    } catch (error) {
        console.log("Get Me Error: ", error.message || error)
        res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ message: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};