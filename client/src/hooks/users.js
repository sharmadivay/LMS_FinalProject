import axios from "axios";
import toast from "react-hot-toast";

const url = "http://localhost:8082/api/user";

export const registerUser = async (data) => {
  try {
    const { name, email, password } = data;
    const res = await axios.post(
      `${url}/register-user`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const loginUser = async (data) => {
  try {
    const { email, password } = data;
    const res = await axios.post(
      `${url}/login-user`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const registerTeacher = async (data) => {
  try {
    const { name, email, password } = data;
    const res = await axios.post(
      `${url}/register-teacher`,
      {
        name,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const loginTeacher = async (data) =>{
  try {
    const {email,password} = data 
    const res = await axios.post(`${url}/login-teacher`,{
      email,
      password
    },{
      withCredentials: true
    });
    return res.data
  } catch (error) {
    toast.error(`${error}`)
  }
}