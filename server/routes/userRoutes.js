import express from "express"
import { getAllUsersControllers, getOneUserController, loginUserController, registerUserController } from "../controllers/userController.js";

const router = express.Router();

// register user
router.post("/register-user",registerUserController);

// login user
router.post("/login-user",loginUserController);

// all users
router.get("/get-users",getAllUsersControllers);

// get one user
router.get("/one-user/:id",getOneUserController);

export default router ;