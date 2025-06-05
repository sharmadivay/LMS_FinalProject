import React from 'react';
import TeacherSidebar from '../../components/Teacher/TeacherSidebar';
import TeacherNavbar from '../../components/Teacher/TeacherNavbar';
import Footer from '../../components/Footer';
const TeacherWelcome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navbar */}
      <TeacherNavbar/>


      {/* Body: Sidebar + Main Content */}

        {/* Sidebar */}
        <TeacherSidebar />

        {/* Main Welcome Card */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-xl text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-teal-700 mb-4">Welcome to LWS, Educator! 🎉</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are thrilled to have you onboard. Your guidance will spark the next generation of thinkers and creators.
              Together, let's build a future filled with knowledge, passion, and excellence.
            </p>
            <p className="mt-6 text-green-700 font-semibold text-xl">
              Your journey of inspiration starts now. 🌟
            </p>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default TeacherWelcome;