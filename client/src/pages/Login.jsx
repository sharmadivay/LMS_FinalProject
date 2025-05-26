import { useState } from "react";
import { loginUser, loginTeacher } from "../hooks/users.js";
import toast from "react-hot-toast";

import { MdEmail } from "react-icons/md"; 

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
    <div className="w-full h-full bg-[#fffefe] text-[#121312] ">
      <div className=" border mx-4 flex flex-col ml-8 h-full  space-y-4">
      <h2 className="text-xl">Lets Sign you in </h2>
      <p className="text-sm font-sm">You don't have an account <span className="underline text-blue-500">sign up</span></p>
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
            <label htmlFor="email">Email </label>
            <div className="flex items-center space-x-2 border rounded-full">
             <MdEmail size={20} className="" />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="px-3 py-2"
              
            />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <div>

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
            </div>
            <button
            type="submit"
            className=" w-full border rounded-full bg-[#1a1a1b] text-[#dbdbdb] "
          >
            Login
          </button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login;