import { useEffect, useState } from "react"
import { getMe } from "../../hooks/getMe.js"
import TeacherPage from "./TeacherPage.jsx"
import { useNavigate } from "react-router-dom"
const Home =  () => {
  const [user,SetUser] = useState("")
  const [role,setRole] = useState("")

  const navigate = useNavigate()

  useEffect(()=>{
    const fetchUser = async () =>{
      const res = await getMe()
      if(res.success){
        setRole(res.role)
        SetUser(res.user)
      }else{
        navigate("/login")
      }
    }

    fetchUser()
  },[])
  return (
    <div>
        
        {role == "student" && navigate("/student")}
        {role == "teacher" &&  navigate("/teacher")}
    </div>
  )
}

export default Home;
