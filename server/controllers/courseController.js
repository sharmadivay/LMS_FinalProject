import {Course}  from "../models/course.js";
import { User } from "../models/userModel.js";  
import { Teacher } from "../models/teacherSchema.js";
import DataUriParser from "datauri/parser.js";      // converts buffer→data‑URL
import cloudinary from "../utils/cloudinary.js";
import path from "path";

const parser = new DataUriParser();

const bufferToDataURI = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer).content;

// CREATE COURSE (Teacher only)
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const instructorId = req.user._id;

    /* ---------- 1. UPLOAD THUMBNAIL ---------- */
    let thumbnailUrl = "";
    if (req.files?.thumbnail?.length) {
      const file = req.files.thumbnail[0];
      const uploadRes = await cloudinary.uploader.upload(bufferToDataURI(file), {
        folder: "courses/thumbnails",
        resource_type: "image",
      });
      thumbnailUrl = uploadRes.secure_url;
    }

    /* ---------- 2. UPLOAD ATTACHMENTS ---------- */
    let attachmentUrls = [];
    if (req.files?.attachments?.length) {
      const uploads = req.files.attachments.map((file) =>
        cloudinary.uploader.upload(bufferToDataURI(file), {
          folder: "courses/attachments",
          resource_type: file.mimetype.startsWith("video") ? "video" : "auto",
        })
      );
      const results = await Promise.all(uploads);
      attachmentUrls = results.map((r) => r.secure_url);
    }

    /* ---------- 3. SAVE COURSE ---------- */
    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: instructorId,
      thumbnail: thumbnailUrl,
      attachments: attachmentUrls,
    });

    await Teacher.findByIdAndUpdate(instructorId, {
      $push: { courseCreated: course._id },
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
};

// GET ALL COURSES
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email")
      .populate("enrolledStudents", "name email");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
};

// ENROLL IN COURSE (Student)
export const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(userId);
    await course.save();

    await User.findByIdAndUpdate(userId, {
      $push: { enrolledCourses: courseId },
    });

    res.status(200).json({ message: "Enrolled successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling in course", error: error.message });
  }
};

// CANCEL ENROLLMENT (Student)
export const cancelEnrollment = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    await Course.findByIdAndUpdate(courseId, {
      $pull: { enrolledStudents: userId },
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { enrolledCourses: courseId },
    });

    res.status(200).json({ message: "Enrollment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling enrollment", error: error.message });
  }
};

// RATE COURSE
export const rateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;
    const { rating, comment } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Check if already rated
    const existingRating = course.ratings.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
    } else {
      course.ratings.push({ user: userId, rating, comment });
    }

    await course.save();
    res.status(200).json({ message: "Course rated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error rating course", error: error.message });
  }
};

// DELETE COURSE (Teacher only)
export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Only teacher can delete their course
    if (course.instructor.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete files
    if (course.thumbnail) fs.unlinkSync(course.thumbnail);
    if (course.attachments && course.attachments.length > 0) {
      course.attachments.forEach((file) => fs.existsSync(file) && fs.unlinkSync(file));
    }

    await Course.findByIdAndDelete(courseId);
    await Teacher.findByIdAndUpdate(userId, {
      $pull: { courseCreated: courseId },
    });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};


