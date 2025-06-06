import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Auth/Login.jsx"
import LandingPage from "./pages/Auth/LandingPage.jsx";
import Register from "./pages/Auth/Register.jsx";


import Home from "./pages/Dashboard/Home.jsx";
import StudentMainCard from "./pages/Sutdents/StudentMainCard.jsx";
import StudentDashboard from "./pages/Sutdents/Studentsdashboard.jsx";
import StudentCouse from "./pages/Sutdents/StudentCouse.jsx";
import Profile from "./pages/Sutdents/StudentProfile.jsx";
import AllCoursess from "./pages/Sutdents/AvaiableCourseforstudents.jsx";
import ProfilePage from "./pages/Dashboard/StudentPage.jsx";
import StudentPage from "./pages/Dashboard/StudentPage.jsx";
import StudentProfile from "./pages/Sutdents/StudentProfile.jsx";
// import TeacherMessages from "./pages/Teacher/Teachermessage.jsx";
// import TeacherWelcome from "./pages/Teacher/Teacherhome.jsx";
function App() {
  return (
    <>
      <Toaster/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/" element={<LandingPage/>}>
           <Route index element={<Login />} />
          <Route path="login" element = {<Login/>}/>
          <Route path="register" element = {<Register/>}/>
          </Route>

          <Route path="/home" element={<Home/>}/>

         {/* student */}
         <Route path="/student" element={<StudentPage/>}>
          <Route index element={<StudentMainCard />} />
          <Route path="profile" element={<StudentProfile/>}/>
          <Route path="allcourses" element={<AllCoursess/>}/>
          <Route path="courses" element={<StudentCouse/>}/>

          </Route>
          


        
        </Routes>

    </>
  )
};







export default App;