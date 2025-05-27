import { useState } from "react"
import {registerUser , registerTeacher} from "../hooks/users.js"
import toast from "react-hot-toast"
import { Link } from "react-router-dom";

import { MdEmail } from "react-icons/md"; 

const Register = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword , setConfirmPassword] = useState("")

  const [role , setRole] = useState("student")

  const handleSubmit = async (e) => {
e.preventDefault()
    const user = {
      name,
      email,
      password
    }
    let res = ""
    
     if(role == "student"){
        res = await registerUser(user)
     }
     else{
      res = await registerTeacher(user)
      
     }
      
     if(res.success){
      toast.success(res.message)
     }else{
      toast.error(res.message)
     }
  }
  return (
    <div className="flex flex-col  items-start w-full h-full rounded-l-xl space-y-4 bg-[#fffefe] px-10">

      
      <div className="mt-32">
        <h3 className="text-2xl">Register now</h3>
        <p>You already have an account <Link to="/login" className="underline text-blue-400">sign in</Link></p>
      </div>

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

    <div className="w-full" >
            <form action="" onSubmit={handleSubmit} className="space-y-4  ">

              {/* name  */}
              <div className="flex flex-col w-full">
                <label htmlFor="name">Name </label>
                <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
                 <MdEmail size={20} className="ml-2" />
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Enter Your Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="px-3 py-2 w-full "
                  
                />
                </div>
              </div>

              {/* email  */}
              <div className="flex flex-col">
                <label htmlFor="email">Email </label>
                <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
                 <MdEmail size={20} className="ml-2" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="px-3 py-2 w-full "
                  
                />
                </div>
              </div>
  
               {/* password */}
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
                 <MdEmail size={20} className="ml-2" />
    
                   <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className=" px-3 py-2 rounded-xl w-full"
                />
                </div>
                </div>

                {/* confirmPassword  */}
                <div className="flex flex-col">
                <label htmlFor="conPassword">Confirm Password</label>
                <div className="flex items-center  border rounded-xl bg-[#FAFCFE]">
                 <MdEmail size={20} className="ml-2" />
    
                   <input
                  type="password"
                  name="conPassword"
                  id="conPassword"
                  value={confirmPassword}
                  placeholder="Re-Enter Your Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  className=" px-3 py-2 rounded-xl w-full"
                />
                </div>
                </div>
                <button
                type="submit"
                className=" w-full border rounded-full bg-[#1a1a1b] text-lg text-[#dbdbdb] py-3 "
              >
                REGISTER
              </button>
                </form>
            </div>  
    </div>
  )
}

export default Register
