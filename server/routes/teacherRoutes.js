import express from "express"
import { avatarController, getAllTeachersControllers, getOneTeacherController, loginTeacherContrller, registerTeacherController, updateTeacherController } from "../controllers/teacherController.js";
import{ upload} from "../utils/multer.js"
import {uploadAvatar} from "../middlewares/avatar.js"
import { postCourse } from "../controllers/teacherController.js";
import { getTeacherCourses } from "../controllers/teacherController.js";
import { deleteCourseByTeacher } from "../controllers/teacherController.js";


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


// course upload
// Get all courses created by logged-in teacher
router.get("/courses",  getTeacherCourses);

// Create a new course (with file uploads)
router.post(
  "/course",
  
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "videos", maxCount: 10 },
    { name: "pdfs", maxCount: 10 },
    { name: "ppts", maxCount: 10 },
    { name: "images", maxCount: 10 },
  ]),
  postCourse
);

// Delete a course (only if teacher created it)
router.delete("/course/:id",  deleteCourseByTeacher);

export default router;