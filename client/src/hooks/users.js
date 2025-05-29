import axios from "axios";
import toast from "react-hot-toast";

const userUrl = "http://localhost:8082/api/user";

const teacherUrl = "http://localhost:8082/api/teacher";

export const registerUser = async (data) => {
  try {
    const { name, email, password } = data;
    const res = await axios.post(
      `${userUrl}/register-user`,
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
      `${userUrl}/login-user`,
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

