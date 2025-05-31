import React, { useEffect, useState } from 'react';
 import StudentNavbar from '../../components/Student/StudentNavbar'; 
 
 import Footer from '../../components/Footer';
  import { motion } from 'framer-motion';
import TeacherDashboard from '../Teacher/Teacherdashboard';
import StudentSidebar from '../../components/Student/StudentSidebar';

const AllCoursess= () => 
      {
             const [courses, setCourses] = useState(
                  [ { id: 1, title: 'Frontend with React',
                         instructor: 'Alice Brown',
                          price: 'Free',
                           description: 'Master React for frontend development.', },
                            { id: 2, title: 'Data Structures & Algorithms',
                               instructor: 'Bob White', 
                               price: '₹699',
                                description: 'Crack coding interviews with DSA.', },
                               ]);

const [myCourses, setMyCourses] = useState([]);

// useEffect(() => { //   fetch('http://localhost:8080/api/student/all-courses') //     .then(res => res.json()) //     .then(data => setCourses(data)) //     .catch(err => console.error(err)); // }, []);

const handleSubscribe = (course) => { 
      setMyCourses((prev) => [...prev, course]); 
      // fetch('http://localhost:8082/api/student/enroll',
      //  { //   method: 'POST', //   headers: { 'Content-Type': 'application/json' },
      //  //   body: JSON.stringify({ courseId: course.id }), // })
      //  //   .then(res => res.json()) //
      //    .then(() => alert('Enrolled successfully!')) //
      //    .catch(err => console.error(err)); };

return ( 
<div className="flex min-h-screen bg-gray-50">
       <StudentSidebar /> <div className="flex-1 flex flex-col">
             <StudentNavbar/> <main className="flex-1 p-6"> 
                  <motion.div initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }} 
                   transition={{ duration: 0.6 }} 
                   className="bg-white p-6 rounded-xl shadow-xl" > 
                   <h1 className="text-3xl font-bold text-gray-800 mb-6">All Courses</h1> 
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {courses.map((course) => ( 
                        <div
key={course.id}
className="bg-gradient-to-br from-yellow-100 to-red-200 p-4 rounded-lg shadow hover:scale-105 transition duration-300"
> <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
 <p className="text-sm text-gray-700">{course.description}</p> 
 <p className="text-sm text-gray-600 mt-1">Instructor: {course.instructor}</p> 
 <p className="text-sm text-gray-600">Price: {course.price}</p> 
 <button onClick={() => handleSubscribe(course)}
  className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition" > Subscribe </button> 
  </div> 
  ))} </div> 
  </motion.div>
   </main> <Footer /> 
   </div> 
   </div> ); };
      }

export default AllCoursess;