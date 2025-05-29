import express from "express"
import {upload }from "../utils/multer.js"
import {uploadAvatar} from "../middlewares/avatar.js"
import { addEnrollement, avatarController, getAllUsersControllers, getOneUserController, loginUserController, registerUserController, updateUserController } from "../controllers/userController.js";

const router = express.Router();

// register user
router.post("/register-user",registerUserController);

// login user
router.post("/login-user",loginUserController);

// all users
router.get("/get-users",getAllUsersControllers);

// get one user
router.get("/one-user/:id",getOneUserController);

// update user
router.put("/update-user/:id",updateUserController);

// add/update avatar
router.put("/update-avatar/:id",upload.single(`avatar`),uploadAvatar,avatarController);

// add enrollement 
router.post("/enroll-course",addEnrollement);

export default router ;