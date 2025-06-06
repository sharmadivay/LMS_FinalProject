import { useState } from "react";
import { loginUser } from "../../hooks/users.js";
import { loginTeacher } from "../../hooks/teachers.js";
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

import {FiUser ,  FiLock , FiMail , FiEye, FiEyeOff} from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
    const [showPassword, setShowPassword] = useState(false);

  const naviagate  = useNavigate()

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
      naviagate("/home")
    } else {
      toast.error(res.message);
    }
  };

  const handleToggle = () =>{
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full h-full bg-[#fffefe] text-[#121312] rounded-l-xl ">
      <div className=" flex flex-col  justify-center items-start w-full h-full rounded-l-xl  space-y-4 bg-[#fffefe] px-10">

      <div>
      <h2 className="text-2xl">Lets Sign you in </h2>
      <p className="">You don't have an account <Link to="/register" className="underline ml-1 text-blue-400">sign up</Link></p>
      </div>


      <div className="flex gap-4">
        <button
          className={`border rounded-full w-24 md:w-36 lg:w-40 h-[50px] transition-colors cursor-pointer ${
            role == "student" ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            setRole("student");
          }}
        >
          student
        </button>
        <button
          className={`border w-24 md:w-36 lg:w-40 h-[50px] rounded-full cursor-pointer ${
            role == "teacher" ? "bg-blue-200" : ""
          }`}
          onClick={() => {
            setRole("teacher");
          }}
        >
          Teacher
        </button>
      </div>


      <div className="w-full">
        <form action="" onSubmit={handleSubmit} className="space-y-4  ">

          {/* email  */}
          <div className="flex flex-col">
            <label htmlFor="email">Email </label>
            <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
              <FiMail size={20} className="ml-2" />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="px-3 py-2 w-full focus:outline-none focus:ring-0 hover:border-none "
              />
            </div>
          </div>

          {/* password  */}
          <div className="flex flex-col">
                      <label htmlFor="password">Confirm Password</label>
                      <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
                        < FiLock  size={20} className="ml-2" />
          
                        <input
                          type={showPassword?"text":"password"}
                          name="password"
                          id="password"
                          value={password}
                          required
                          placeholder="Enter Your Password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          className=" px-3 py-2 w-full focus:outline-none focus:ring-0 hover:border-none"
                        />
                        {
                          showPassword? <FiEyeOff onClick={handleToggle} size={20} className="mr-2"/> : <FiEye size={20} onClick={handleToggle} className="mr-2"/>
                        }
                      </div>
                    </div>
            <button
            type="submit"
            className="w-full border rounded-full bg-[#1a1a1b] text-lg text-[#dbdbdb] py-3 cursor-pointer"
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