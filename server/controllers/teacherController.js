import { Teacher } from "../models/teacherSchema.js";
import { hashPassword, comparePasswords } from "../utils/passwordProtect.js";
import {generateToken} from "../utils/genrateToken.js";

// register controller
export const registerTeacherController = async (req, res) => {
  try {
    const { name, email, password , phone} = req.body;

    // validation
    if ((!name || !email || !password)) {
      return res.json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exists
    const checkUser = await Teacher.findOne({ email });

    if (checkUser && checkUser.isVerified == "false") {
      return res.json({
        success: false,
        message: "Application Under Verification",
      });
    }

    if (checkUser && checkUser.isVerified == "rejected") {
      return res.json({
        success: false,
        message: "Application Rejected",
      });
    }

    if (checkUser && checkUser.isVerified == "true") {
      return res.json({
        success: false,
        message: "Teacher Already Exists",
      });
    }


    // hash Password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = new Teacher({
      name,
      email,
      password: hashedPassword,
      phone
    });

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Created",
      });
    }

    // add teacher
    await user.save();
    
    const savedUser = await Teacher.findOne({email}).select(`-password`);
    
    res.status(200).json({
      success: true,
      message: "Application Sent For Verification ",
    });
  } catch (error) {
    console.log("Register Teacher Error", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login Controller
export const loginTeacherContrller = async (req, res) => {
  try {
    
    const { email, password } = req.body;
  
    // validation
    if ((!email || !password)) {
      return res.json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exist
    const checkUser = await Teacher.findOne({ email });
  
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Register",
      });
    }

     if (checkUser && checkUser.isVerified == "false") {
      return res.json({
        success: false,
        message: "Application Under Verification",
      });
    }

    if (checkUser && checkUser.isVerified == "rejected") {
      return res.json({
        success: false,
        message: "Application Rejected",
      });
    }

    // check password
    const checkPassword = await comparePasswords(password, checkUser.password);

    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Password Not Match",
      });
    }

    await generateToken(res,checkUser._id);

    // login User
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
    });
  } catch (error) {
    console.log("Login Teacher Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all teachers
export const getAllTeachersControllers = async (req, res) => {
  try {
    const existingUsers = await Teacher.find().select(`-password`);

    if (!existingUsers) {
      return res.json({
        success: false,
        message: "No User Register",
      });
    }

    res.status(200).json({
      success: true,
      message: "All Users",
      users: existingUsers,
    });
  } catch (error) {
    console.log("Gel All User Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get user
export const getOneTeacherController = async (req, res) => {
  try {
    const { id } = req.params;

    // check user
    const checkUser = await Teacher.findById(id).select(`-password`);

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      user: checkUser,
    });
  } catch (error) {
    console.log("Get One User Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update user
export const updateTeacherController = async (req, res) => {
  try {
    const { name, password , phone , country } = req.body;
    const { id } = req.params;

    // check user
    const checkUser = await Teacher.findById(id);

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    let hashedPassword = "";

    if (password) {
      hashedPassword = await hashPassword(password);
    }

    // get updated values
    checkUser.name = name || checkUser.name;
    checkUser.password = hashedPassword || checkUser.password;
    checkUser.phone = phone || checkUser.phone,
    checkUser.country = country || checkUser.country

    await checkUser.save();

    res.status(200).json({
      success: false,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log("Update User Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal server Error",
    });
  }
};

// add update avatar
export const avatarController = async (req, res) => {
  try {
    const { url } = req.avatar;

    const { id } = req.params;

    const checkUser = await Teacher.findById(id).select(`-password`);

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not found",
      });
    }

    checkUser.avatar = url || checkUser.avatar;

    await checkUser.save();

    res.status(200).json({
      success: true,
      message: "Avatar Added Successfully",
      checkUser,
    });
  } catch (error) {
    console.log("Avatar Error", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

///course post
export const postCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;
    const filePaths = {
      thumbnail: req.files?.thumbnail?.[0]?.path || "",
      video: req.files?.video?.[0]?.path || "",
      pdf: req.files?.pdf?.[0]?.path || "",
      image: req.files?.image?.[0]?.path || "",
    };

    const course = await Course.create({
      title,
      description,
      category,
      price,
      thumbnail: filePaths.thumbnail,
      video: filePaths.video,
      pdf: filePaths.pdf,
      image: filePaths.image,
      instructor: req.user._id,
    });

    const teacher = await Teacher.findById(req.user._id);
    teacher.courseCreated.push(course._id);
    await teacher.save();

    res.status(201).json({ message: "Course created", course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

///Get courses created by teacher
export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete course
export const deleteCourseByTeacher = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized: You cannot delete this course" });
    }

    await Course.findByIdAndDelete(req.params.id);

    // Remove from teacher's list
    await Teacher.findByIdAndUpdate(req.user._id, {
      $pull: { courseCreated: course._id },
    });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
///teacher courses all
export const getTeacherCourses = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate({
        path: "courseCreated",
        populate: {
          path: "instructor",
          select: "name email", // Optional: show instructor details
        },
      })
      .select("name email courseCreated avatar"); // Adjust what fields you want

    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teacher courses", error: error.message });
  }
};
