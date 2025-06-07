import { User } from "../models/userModel.js";
import {Course} from "../models/course.js"
import { comparePasswords, hashPassword } from "../utils/passwordProtect.js";
import { generateToken } from "../utils/genrateToken.js";

// register user
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password , phone } = req.body;

    // validation
    if ((!name || !email || !password || !phone)) {
      return res.json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exists
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already Register",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      avatar: "https://res.cloudinary.com/duecnsulw/image/upload/v1748502713/wa8tmkxplsd0kgzw478b.avif"
    }); 

    if (!user) {
      return res.json({
        success: false,
        message: "User Not Created",
      });
    }

    // add user
    await user.save();
    
    const savedUser = await User.findOne({email}).select(`-password`);

    await generateToken(res,savedUser._id);

    res.status(200).json({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    console.log("User Registration Error :", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// login user
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if ((!email ||  !password)) {
      return res.json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exists
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Register",
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

    // login user
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
    });
  } catch (error) {
    console.log("User Login Error: ", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get all users
export const getAllUsersControllers = async (req, res) => {
  try {
    const existingUsers = await User.find().select(`-password`);

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
export const getOneUserController = async (req, res) => {
  try {
    const { id } = req.params;

    // check user
    const checkUser = await User.findById(id).select(`-password`);

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
export const updateUserController = async (req, res) => {
  try {
    const { name, phone , country } = req.body;
    const { id } = req.user;

    // check user
    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

  

    // get updated values
    checkUser.name = name || checkUser.name;
    checkUser.phone = phone || checkUser.phone;
    checkUser.country = country || checkUser.country

    await checkUser.save();

    res.status(200).json({
      success: true,
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
    console.log(req.user)
    const { id } = req.user;

    const checkUser = await User.findById(id).select(`-password`);

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
    });
  } catch (error) {
    console.log("Avatar Error", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// enrollment
export const addEnrollement = async (req, res) => {
  try {
    const { id } = req.params;
    const { enrollCourseId } = req.body;

    // check user
    const checkUser = await User.findById(id).select(`-password`);

    if (!checkUser) {
      return res.json({
        success: false,
        message: "No User Found",
      });
    }

    // Check if course already enrolled
    if (checkUser.enrolledCourses.includes(enrollCourseId)) {
      return res.json({
        success: false,
        message: "Already Enrolled in this Course",
      });
    }

    checkUser.enrolledCourses.push(enrollCourseId);

    const course = await Course.findById(enrollCourseId);
    course.enrolledStudents.push(id);

    checkUser.save();
    course.save();


    res.status(200).json({
      success: true,
      message: "Course Enrolled Successfully",
    });
  } catch (error) {
    console.log("Add Enrollment Error", error.message || error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// logout 

