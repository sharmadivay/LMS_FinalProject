import axios from "axios";
import toast from "react-hot-toast";

const userUrl = "http://localhost:8082/api/user";

export const registerUser = async (data) => {
  try {
    const { name, email, password, phone } = data;
    const res = await axios.post(
      `${userUrl}/register-user`,
      {
        name,
        email,
        password,
        phone,
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

export const avatar = async (image) => {
  try {
    const formData = new FormData();
    formData.append("avatar", image); // 👈 "avatar" must match multer field name

    const res = await axios.put(`${userUrl}/update-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const updateUser = async (data) => {
  try {
    const { name, phone, country } = data;
    const res = await axios.put(
      `${userUrl}/update-user`,
      {
        name,
        country,
        phone,
      },
      { withCredentials: true }
    );
    return res.data
  } catch (error) {
    toast.error(`${error}`);
  }
};
