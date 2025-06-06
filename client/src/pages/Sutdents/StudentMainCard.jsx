import React from 'react'

const StudentMainCard = () => {
  return (
    <div>
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
  )
}

export default StudentMainCard
