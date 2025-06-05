import React, { useEffect, useState } from 'react'; 
import StudentSidebar from '../../components/Student/StudentSidebar'; 
import StudentNavbar from '../../components/Student/StudentNavbar';
 import Footer from '../../components/Footer';
  import { motion } from 'framer-motion';

const MyCourses = () => {
       const [courses, setCourses] =
       useState([ { id: 1, title: 'Full Stack Development', instructor: 'John Doe', price: 'Free', enrolledDate: '2025-05-01', },
             { id: 2, title: 'Introduction to Python', instructor: 'Jane Smith', price: '₹499', enrolledDate: '2025-05-05', }, 
            ]);

// useEffect(() => { //   fetch('http://localhost:8080/api/student/my-courses') //   
//   .then(res => res.json()) //     .then(data => setCourses(data)) //    
//  .catch(err => console.error(err)); // }, []);

return (
       <div className="flex min-h-screen bg-gray-10"> 
       <StudentNavbar />
        <div className="flex-1 flex flex-col">
             <StudentSidebar/><main className="flex-1 p-6">
                   <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }}
                     className="bg-white p-6 rounded-xl shadow-xl" > 
                     <h1 className="text-3xl font-bold text-gray-800 mb-6">My Courses</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                        {courses.map((course) =>
                         ( <div
key={course.id}
className="bg-gradient-to-r from-indigo-100 to-purple-200 p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300"

> <h2 className="text-xl font-semibold text-gray-800">
      {course.title}
      </h2>
       <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
        <p className="text-sm text-gray-600">Enrolled: {course.enrolledDate}</p> 
        <p className="text-sm text-gray-600">Price: {course.price}</p>
         <button className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">Go to Course</button>
          </div>
           ))}
            </div> 
            </motion.div> 
            </main> 
            <Footer />
             </div> 
             </div>
              );
             };

export default MyCourses;