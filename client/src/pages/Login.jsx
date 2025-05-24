import { useState } from "react"
import { registerUser } from "../hooks/users.js";
import toast from "react-hot-toast";


const Login = () => {

const [email,setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
 e.preventDefault()
  
 const data = {
  name : "Tushar",
  email: "tushar@gmail.com",
  password: "123456"
 }
  const res = await registerUser(data);
  if(res.success){
    toast.success(res.message)
  }else{
    toast.error(res.message)
  }
}
 
  return (
   <>
     <button onClick={handleSubmit}>
      Hello
     </button>
   </>
  )
}

export default Login
