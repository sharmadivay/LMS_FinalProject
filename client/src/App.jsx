import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Auth/Login.jsx"
import LandingPage from "./pages/Auth/LandingPage.jsx";
import Register from "./pages/Auth/Register.jsx";
// import './App.css'
// import TeacherDashboard from "./pages/Teacher/Teacherdashboard.jsx";
// import UploadCourse from "./pages/Teacher/UploadCourse.jsx";
// import TeacherNavbar from "./components/Teachers/TeacherNavbar.jsx";
// import ManageCourses from "./pages/Teacher/CourseManagement.jsx";
// import AllCourses from "./pages/Teacher/CoursesAvaliable.jsx";
// import StudentDashboard from "./pages/Sutdents/Studentsdashboard.jsx";
// import StudentSidebar from "./components/Student/StudentSidebar.jsx";
// import TeacherSidebar from "./components/teachers/TeacherSideBar.jsx";
// import MyCourses from "./pages/Sutdents/StudentCouse.jsx";
// import AllCoursess from "./pages/Sutdents/AvaiableCoursefostudents.jsx";
import StudentWelcome from "./pages/Sutdents/StudentHome.jsx";
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

          <Route path="/home" element={<ProfilePage/>}/>

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