import React from 'react';

const StudentWelcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-semibold">🎓 Welcome to LWS Student Portal</h1>
      </nav>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-800 text-white py-6 px-4">
          <ul className="space-y-4">
            <li className="hover:bg-indigo-600 px-4 py-2 rounded transition-all cursor-pointer">Dashboard</li>
            <li className="hover:bg-indigo-600 px-4 py-2 rounded transition-all cursor-pointer">My Courses</li>
            <li className="hover:bg-indigo-600 px-4 py-2 rounded transition-all cursor-pointer">Profile</li>
            <li className="hover:bg-indigo-600 px-4 py-2 rounded transition-all cursor-pointer">Logout</li>
          </ul>
        </aside>

        {/* Main Welcome Card */}
        <main className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
          {/* Bouncing Background Dots */}
          <div className="absolute w-80 h-80 bg-purple-300 rounded-full blur-3xl opacity-30 animate-ping -top-20 -left-20"></div>
          <div className="absolute w-60 h-60 bg-pink-300 rounded-full blur-3xl opacity-20 animate-ping-slow -bottom-20 -right-20"></div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl text-center animate-fade-in-up z-10">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">Hello Student! 🎉</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are super excited to welcome you to the Learning World System. 🚀
              Get ready to explore, grow, and achieve amazing things. Your learning journey begins here!
            </p>
            <p className="mt-6 text-pink-700 font-semibold text-xl">
              Let's unlock your full potential. 💡📘
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} LWS • Empowering Students for Tomorrow
      </footer>
    </div>
  );
};

export default StudentWelcome;