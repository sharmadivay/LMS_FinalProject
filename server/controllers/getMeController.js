import {User} from "../models/userModel.js"
import {Teacher} from "../models/teacherSchema.js"
export const getMeController = async (req,res) => {
    try {
        const user = req.user
        const role = User.findById(user.id) ? "student" : "teacher" ;
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