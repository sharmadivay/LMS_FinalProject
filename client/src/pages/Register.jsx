import { useState } from "react"
import {registerUser , registerTeacher} from "../hooks/users.js"
import toast from "react-hot-toast"

const Register = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [role , setRole] = useState("student")

  const handleSubmit = async () => {
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
    <div className=" w-full h-full rounded-l-xl  bg-[#fffefe]">
      
    </div>
  )
}

export default Register
