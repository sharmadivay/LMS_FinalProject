import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// db
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

app.listen(PORT, async ()=>{
    await connectDB();
    console.log(`Server is listening at Port : ${PORT}`);
})