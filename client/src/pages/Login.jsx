import { useState } from "react";
import { loginUser, loginTeacher } from "../hooks/users.js";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    let res = "";
    if (role == "student") {
      res = await loginUser(data);
    } else {
      res = await loginTeacher(data);
    }

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex flex-col w-[50%] justify-center items-center space-y-4 bg-[#E5E4E2] ">
      <h2>Login Page</h2>
      <div className="flex gap-4">
        <button
          className={`border rounded-full w-40 h-[50px] transition-colors ${
            role == "student" ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            setRole("student");
          }}
        >
          student
        </button>
        <button
          className={`border w-40 h-[50px] rounded-full ${
            role == "teacher" ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            setRole("teacher");
          }}
        >
          Teacher
        </button>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border rounded-md px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className=" w-full border rounded-full px-3 py-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
