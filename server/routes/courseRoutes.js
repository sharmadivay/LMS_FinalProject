import express from "express";
import {
  createCourse,
  getAllCourses,
  enrollCourse,
  cancelEnrollment,
  deleteCourse,
  rateCourse,
} from "../controllers/courseController.js";
import { courseUpload } from "../utils/multer.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all available courses (public)
router.get("/all", getAllCourses);

// POST a new course (protected, teachers only, upload thumbnail & attachments)
router.post(
  "/",
  protect,
  courseUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "attachments", maxCount: 10 },
  ]),
  createCourse
);

//  Enroll in a course (student only)
router.post("/enroll/:id", protect, enrollCourse);

//  Cancel enrollment (student only)
router.post("/cancel/:id", protect, cancelEnrollment);

// Rate a course (student only)
router.post("/rate/:id", protect, rateCourse);

// Delete a course (teacher only)
router.delete("/:id", protect, deleteCourse);

export default router;