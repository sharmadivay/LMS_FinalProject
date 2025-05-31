import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../../assets/teacher.jpg';
import coursesIcon from '../../assets/teacher.jpg';
import studentsIcon from '../../assets/teacher.jpg';
import settingsIcon from '../../assets/teacher.jpg';

const navLinks = [
  { name: 'Dashboard', path: '', icon: dashboardIcon },
  { name: 'Manage Courses', path: '', icon: coursesIcon },
  { name: 'Upload Course', path: '', icon: studentsIcon },
  { name: 'Message', path: '', icon: settingsIcon },
];

const TeacherSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-50 w-64 h-screen bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-md text-gray-800 dark:text-white">
      <div className="mt-6 flex flex-col items-center space-y-4 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`w-full flex flex-col items-center py-4 rounded-lg transition-all ${
              location.pathname === link.path
                ? 'bg-indigo-200 dark:bg-indigo-700'
                : 'hover:bg-indigo-50 dark:hover:bg-gray-700'
            }`}
          >
            <img src={link.icon} alt={link.name} className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium text-center">{link.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default TeacherSidebar;