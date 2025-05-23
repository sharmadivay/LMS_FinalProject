import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// routes
import userRoute from "./routes/userRoutes.js"
import teacherRoute from "./routes/teacherRoutes.js"

// db
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// routes
app.use("/api/user",userRoute);
app.use("/api/teacher",teacherRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server is listening at Port : ${PORT}`);
})