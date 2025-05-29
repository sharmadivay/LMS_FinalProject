import toast from "react-hot-toast";
import axios from "axios";

const url  = "http://localhost:8082/api"
export const getMe = async () => {
    try {
        const res = await axios.get(`${url}/getMe`,{
            withCredentials: true
        })

        return res.data
    } catch (error) {
        toast.error(`${error}`)
    }
}