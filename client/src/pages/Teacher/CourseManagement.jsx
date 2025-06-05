 import React, { useEffect, useState } from "react";
  //import Sidebar from "../components/Sidebar";
   import TeacherNavbar from "../../components/Teachers/TeacherNavbar";
    import Footer from "../../components/Footer";
     import axios from "axios"; import { motion } from "framer-motion";

const ManageCourses = () => { const [courses, setCourses] =
   useState([]);
    const [selectedCourse, setSelectedCourse] = 
    useState(null);
     const [students, setStudents] = 
     useState([]);
      const [showStudents, setShowStudents] =
       useState(false);

useEffect(() => { 
  const fetchCourses = async () =>
     { 
      try { 
        const token = localStorage.getItem("token");
         const res = await axios.get("/api/teacher/courses", 
          { headers: { Authorization:` Bearer ${token}`, },
         });
          setCourses(res.data);
         } catch (error)
          { console.error("Error fetching courses:", error); 

          } };
           fetchCourses(); }, []);

const handleDelete = async (courseId) =>
   { 
    try { const token = localStorage.getItem("token");
       await axios.delete(//delete course api}, 
        { headers: { Authorization: `Bearer ${token}`, 
         }, 
         }); 
         setCourses(courses.filter((course) => 
          course._id !== courseId));
         } catch (error) { console.error("Error deleting course:", error); } };

const handleViewStudents = async (courseId) =>
   { try { const token = localStorage.getItem("token");
     const res = await axios.get((`/api/teacher/course/${courseId}/students`), 
      { headers: { Authorization:` Bearer ${token}`, }, }); 
      setStudents(res.data); setSelectedCourse(courseId); 
      setShowStudents(true); } catch  { console.error("Error fetching students:", error); } };

return ( <
  div className="flex min-h-screen bg-gray-50">
    // Sidebar
   <div className="flex flex-col flex-1"> 
   <TeacherNavbar /> 
   <main className="p-6"> <h1 className="text-3xl font-bold mb-6">Manage Your Courses</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            className="bg-white rounded-xl shadow p-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-2">{course.description}</p>
            <p className="text-sm text-gray-500 mb-4">
              {course.isPaid ? Paid - `₹${course.price}` : "Free"}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleViewStudents(course._id)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Students
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {showStudents && (
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Enrolled Students</h2>
          <ul className="space-y-2">
            {students.map((student) => (
              <li key={student._id} className="border-b py-2">
                {student.name} ({student.email})
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowStudents(false)}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </main>
    <Footer />
  </div>
</div>

); };

export default ManageCourses;