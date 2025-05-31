import {Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Login from "./pages/Auth/Login.jsx"
import LandingPage from "./pages/Auth/LandingPage.jsx";
import Register from "./pages/Auth/Register.jsx";
import './App.css'
import TeacherDashboard from "./pages/Teacher/Teacherdashboard.jsx";
import UploadCourse from "./pages/Teacher/UploadCourse.jsx";
import TeacherNavbar from "./components/Teachers/TeacherNavbar.jsx";
import ManageCourses from "./pages/Teacher/CourseManagement.jsx";
import AllCourses from "./pages/Teacher/CoursesAvaliable.jsx";
import StudentDashboard from "./pages/Sutdents/Studentsdashboard.jsx";
function App() {
  return (
    //<div><TeacherDashboard/></div>
    <div><StudentDashboard/></div>
  );
};







export default App;