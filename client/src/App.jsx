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
// import TeacherMessages from "./pages/Teacher/Teachermessage.jsx";
// import TeacherWelcome from "./pages/Teacher/Teacherhome.jsx";
function App() {
  return (
    //<div><TeacherDashboard/></div>
    <div><StudentWelcome/></div>
  );
};







export default App;