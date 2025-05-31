import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import TeacherDashboard from "./Teacherdashboard";
import TeacherNavbar from "../../components/Teachers/TeacherNavbar";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [sortedCourses, setSortedCourses] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/courses")
      .then((res) => {
        setCourses(res.data);
        setSortedCourses(res.data);
      })
      .catch((err) => console.error("Error fetching courses", err));
  }, []);

  useEffect(() => {
    let sorted = [...courses];
    switch (sortOption) {
      case "title_asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "fileType":
        sorted.sort((a, b) => a.fileType.localeCompare(b.fileType));
        break;
      case "teacher":
        sorted.sort((a, b) => a.teacherName.localeCompare(b.teacherName));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "newest":
      default:
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortedCourses(sorted);
  }, [sortOption, courses]);

  const handleJoin = async (courseId) => {
    try {
      const response = await axios.post(`http://localhost:8082/api/courses/enroll`, {
        courseId,
        studentId: "STUDENT_ID_HERE", // Replace with real student ID
      });
      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Enrollment failed", error);
      alert("Already enrolled or error occurred");
    }
  };

  return (
      
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-purple-200 p-6">
      <TeacherNavbar/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">📚 Available Courses</h1>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded bg-white shadow-sm"
        >
          <option value="newest">🆕 Newest First</option>
          <option value="oldest">📜 Oldest First</option>
          <option value="title_asc">🔤 Title (A-Z)</option>
          <option value="title_desc">🔠 Title (Z-A)</option>
          <option value="fileType">📎 File Type</option>
          <option value="teacher">👨‍🏫 Teacher Name</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCourses.map((course) => (
          <motion.div
            key={course._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {course.previewImage && (
              <img
                src={`http://localhost:8082/uploads/${course.previewImage}`}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-indigo-700">{course.title}</h2>
              <p className="text-gray-600 mt-1 text-sm">{course.description}</p>

              <div className="flex items-center mt-3">
                <span className="text-sm text-gray-500">👨‍🏫 {course.teacherName}</span>
                <span className="ml-auto bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {course.fileType?.toUpperCase()}
                </span>
              </div>

              <button
                onClick={() => handleJoin(course._id)}
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded transition"
              >
                Join Course
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;