import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import dashboardIcon from '../../assets/homeImage.jpg';
import coursesIcon from '../../assets/homeImage.jpg';
import progressIcon from '../../assets/homeImage.jpg';
import settingsIcon from '../../assets/homeImage.jpg';

const navLinks = [
  { name: 'Dashboard', path: '', icon: dashboardIcon },
  { name: 'Courses', path: '', icon: coursesIcon },
  { name: 'My Course', path: '', icon: progressIcon },
  { name: 'Message', path: '', icon: settingsIcon },
];

const StudentSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-900 border-r border-indigo-200 dark:border-indigo-700 shadow-md text-indigo-800 dark:text-white">
      <div className="mt-6 flex flex-col items-center space-y-4 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`w-full flex flex-col items-center py-4 rounded-lg transition-all ${
              location.pathname === link.path
                ? 'bg-indigo-100 dark:bg-indigo-700'
                : 'hover:bg-indigo-50 dark:hover:bg-gray-800'
            }`}
          >
            <img src={link.icon} alt={link.name} className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default StudentSidebar;