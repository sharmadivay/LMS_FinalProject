import mongoose from "mongoose"

const connect = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error :", error.message || error);
    }
}

export default connect ;