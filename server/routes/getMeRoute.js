import express from "express"
import { protectedRoute } from "../middlewares/projectedRoute.js"
import { getMeController, logoutController } from "../controllers/getMeController.js"

const router = express.Router()

router.get("/getMe",protectedRoute,getMeController)

router.get("/logout",logoutController)

export default router