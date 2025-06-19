import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Auth/Login.jsx"
import LandingPage from "./pages/Auth/LandingPage.jsx";
import Register from "./pages/Auth/Register.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import AllCoursess from "./pages/Sutdents/AvaiableCourseforstudents.jsx";

// student imports 
import StudentCouse from "./pages/Sutdents/StudentCouse.jsx";
import StudentPage from "./pages/Dashboard/StudentPage.jsx";
import StudentProfile from "./pages/Sutdents/StudentProfile.jsx";
import StudentHome from "./pages/Sutdents/StudentHome.jsx";


// teacher imports 
import TeacherProfile from "./pages/Teacher/TeacherProfile.jsx";
import Cart from "./pages/Sutdents/Cart.jsx";
import TeacherPage from "./pages/Dashboard/TeacherPage.jsx";
import UploadCourse from "./components/teachers/UploadCourse.jsx";

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
          <Route index element={<StudentHome />} />
          <Route path="profile" element={<StudentProfile/>}/>
          <Route path="allcourses" element={<AllCoursess/>}/>
          <Route path="courses" element={<StudentCouse/>}/>
          <Route path="cart" element={<Cart/>}/>
          </Route>
          
           {/* Teacher  */}
          <Route path="/teacher" element={<TeacherPage/>}>
          <Route index element={<StudentHome />} />
          <Route path="profile" element={<TeacherProfile/>}/>
          <Route path="allcourses" element={<AllCoursess/>}/>
          <Route path="mycourses" element={<AllCourses/>}/>
          <Route path="courses" element={<StudentCouse/>}/>
          <Route path="cart" element={<Cart/>}/>
            <Route/>
          </Route>


        
        </Routes>

    </>
  )
};







export default App;