import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import teacherImg from '../../assets/teacher.jpg';

const TeacherNavbar = ({ username }) => {
  const navigate = useNavigate();

  const links = [
     { name: 'Home', path: '/student/dashboard' },
     { name: 'Course Avaliable', path: '/student/courses' },
     { name: 'About us', path: '/student/achievements' },
   ];
 
   const handleLogout = () => {
     localStorage.clear();
     navigate('../../pages/Auth/LandingPage.jsx');
   };
 
   return (
     <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-lg backdrop-blur-md">
       <div className="max-w-full px-6 py-3 flex justify-between items-center">
         {/* Left: Logo */}
         <div className="flex items-center space-x-3">
           <img src={logo} alt="Logo" className="h-10 w-10 rounded-full shadow" />
           <span className="text-2xl font-extrabold text-indigo-700 dark:text-white tracking-wide">
             LearningGood        </span>
         </div>
 
         {/* Center Nav */}
         <nav className="hidden md:flex gap-6">
           {links.map(link => (
             <Link
               key={link.name}
               to={link.path}
               className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-white font-semibold py-1.5 px-4 rounded-full shadow hover:bg-indigo-100 dark:hover:bg-indigo-700 transition duration-300"
             >
               {link.name}
             </Link>
           ))}
         </nav>
 
         {/* Right: Profile & Logout */}
         <div className="flex items-center space-x-4">
           <span className="text-gray-800 dark:text-white hidden md:inline font-medium">{username}</span>
           <div className="relative group">
             <img
               src={teacherImg}
               alt="Teachrer"
               className="h-10 w-10 rounded-full border-2 border-indigo-500 dark:border-indigo-400 shadow-md hover:scale-105 transition-transform"
             />
             <span className="absolute -bottom-1 -right-1 bg-green-400 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900"></span>
           </div>
           <button
             onClick={handleLogout}
             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-md transition"
           >
             Logout
           </button>
         </div>
       </div>
     </header>
   );
};

export default TeacherNavbar;