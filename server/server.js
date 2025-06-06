import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
// routes
import userRoute from "./routes/userRoutes.js"
import teacherRoute from "./routes/teacherRoutes.js"

import courseRoute from "./routes/courseRoutes.js";




import getMeRouter from "./routes/getMeRoute.js"


 

// db
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//static files uploads
app.use("/uploads", express.static("uploads"));
// routes
app.use("/api/user",userRoute);
app.use("/api/teacher",teacherRoute);
app.use("/api/course",courseRoute);

app.use("/api",getMeRouter)

app.use("/api/course",courseRoute);


app.use("/api",getMeRouter)


const PORT = process.env.PORT || 8000;

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server is listening at Port : ${PORT}`);
})



