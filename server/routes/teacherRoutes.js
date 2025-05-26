import express from "express"
import { avatarController, getAllTeachersControllers, getOneTeacherController, loginTeacherContrller, registerTeacherController, updateTeacherController } from "../controllers/teacherController.js";
import upload from "../utils/multer.js"
import {uploadAvatar} from "../middlewares/avatar.js"
const router = express.Router();

// register teacher
router.post("/register-teacher",registerTeacherController);

// login teacher
router.post("/login-teacher",loginTeacherContrller);

// all users
router.get("/get-teachers",getAllTeachersControllers);

// get one user
router.get("/one-teacher/:id",getOneTeacherController);

// update user
router.put("/update-teacher/:id",updateTeacherController);

// add/update avatar
router.put("/update-avatar/:id",upload.single(`avatar`),uploadAvatar,avatarController);

export default router ;