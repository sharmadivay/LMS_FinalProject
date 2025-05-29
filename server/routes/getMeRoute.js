import express from "express"
import { protectedRoute } from "../middlewares/projectedRoute.js"
import { getMeController } from "../controllers/getMeController.js"

const router = express.Router()

router.get("/getMe",protectedRoute,getMeController)

export default router