import React, { useEffect, useState } from "react";
 import axios from "axios";
  import { motion } from "framer-motion";
   import { FaTrash, FaEdit, FaUsers, FaEye, FaSearch } from "react-icons/fa";
   import TeacherNavbar from "../../components/Teachers/TeacherNavbar";
   import Footer from "../../components/Footer";

const ManageCourses = () => { const [courses, setCourses] = useState([]);
       const [selectedCourse, setSelectedCourse] = useState(null);
        const [students, setStudents] = useState([]);
         const [searchTerm, setSearchTerm] = useState("");
          const [sortField, setSortField] = useState("title");
           const [sortOrder, setSortOrder] = useState("asc");

const fetchCourses = async () => { try { const res = await axios.get("http://localhost:8080/api/teacher/courses");
       setCourses(res.data); } catch (err) { console.error(err); } 
      };

const fetchStudents = async (courseId) => { try { const res = await axios.get(`http://localhost:8082/api/teacher/course/${courseId}/students`); 
      setStudents(res.data); setSelectedCourse(courseId); } catch (err) { console.error(err); } };

const deleteCourse = async (courseId) => { try { await axios.delete(`http://localhost:8080/api/teacher/course/${courseId}`);
       fetchCourses();
       } catch (err) { console.error(err);

        }
       };

const handleSort = (field) => { const order = field === sortField && sortOrder === "asc" ? "desc" : "asc"; 
      setSortField(field);
       setSortOrder(order);
       };

const sortedCourses = [...courses] .filter((c) =>
       c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.category.toLowerCase().includes(searchTerm.toLowerCase())
 
)
 .sort((a, b) =>
       { if (sortOrder === "asc") return a[sortField].localeCompare(b[sortField]);
             return b[sortField].localeCompare(a[sortField]); 
            }
      );

useEffect(() => { fetchCourses(); }, []);

return (

      
<div className="p-6">
      <TeacherNavbar/>
       <div className="flex justify-between items-center mb-6">
            
             <h2 className="text-3xl font-semibold text-gray-800">Manage Courses</h2> 
             <div className="flex gap-2"> 
                  <input type="text" placeholder="Search courses..." className="px-4 py-2 border rounded shadow" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                   </div>
                    </div>

<table className="w-full table-auto border shadow-md rounded overflow-hidden">
    <thead className="bg-gray-100">
      <tr>
        <th onClick={() => handleSort("title")} className="cursor-pointer px-4 py-2">Title</th>
        <th onClick={() => handleSort("category")} className="cursor-pointer px-4 py-2">Category</th>
        <th className="px-4 py-2">Price</th>
        <th className="px-4 py-2">Actions</th>
        <th className="px-4 py-2">Students</th>
      </tr>
    </thead>
    <tbody>
      {sortedCourses.map((course) => (
        <tr key={course.id} className="hover:bg-gray-50">
          <td className="px-4 py-2">{course.title}</td>
          <td className="px-4 py-2">{course.category}</td>
          <td className="px-4 py-2">{course.isFree ? "Free" : `${course.price}`}</td>
          <td className="px-4 py-2 flex gap-2">
            <button className="text-blue-500"><FaEdit /></button>
            <button onClick={() => deleteCourse(course.id)} className="text-red-500"><FaTrash /></button>
          </td>
          <td className="px-4 py-2">
            <button onClick={() => fetchStudents(course.id)} className="text-green-500 flex items-center gap-1">
              <FaUsers /> View
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {selectedCourse && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 border rounded shadow-md bg-white"
    >
      <h3 className="text-xl font-bold mb-4">Enrolled Students</h3>
      {students.length === 0 ? (
        <p className="text-gray-500">No students enrolled in this course yet.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {students.map((student) => (
            <li key={student.id} className="text-gray-700">
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )}
  <footer/>
</div>

); };

export default ManageCourses;