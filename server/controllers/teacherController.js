import { Teacher } from "../models/teacherSchema.js";
import { hashPassword, comparePasswords } from "../utils/passwordProtect.js";
import {generateToken} from "../utils/genrateToken.js";

// register controller
export const registerTeacherController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if ((!name || !email || !password)) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exists
    const checkUser = await Teacher.findOne({ email });

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Teacher Already Exits",
      });
    }

    // hash Password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = new Teacher({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Created",
      });
    }

    // add teacher
    await user.save();
    
    const savedUser = await Teacher.findOne({email}).select(`-password`);
    
    await generateToken(savedUser._id)

    res.status(200).json({
      success: true,
      message: "Teacher Register Successfully",
    });
  } catch (error) {
    console.log("Register Teacher Error", error.message || error);
    res.status(500).json({
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
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    // check if user exist
    const checkUser = Teacher.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User Not Register",
      });
    }

    // check password
    const checkPassword = await comparePasswords(password, checkUser.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Password Not Match",
      });
    }

    await generateToken(checkUser._id);

    // login User
    res.status(200).json({
      success: true,
      message: "User Login Successfully",
    });
  } catch (error) {
    console.log("Login Teacher Error: ", error.message || error);
    res.status(500).json({
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
      return res.status(400).json({
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
    res.status(500).json({
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
      return res.status(400).json({
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update user
export const updateTeacherController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const { id } = req.params;

    // check user
    const checkUser = await Teacher.findById(id);

    if (!checkUser) {
      return res.status(400).json({
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

    await checkUser.save();

    res.status(200).json({
      success: false,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log("Update User Error: ", error.message || error);
    res.status(500).json({
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
      return res.status(400).json({
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
