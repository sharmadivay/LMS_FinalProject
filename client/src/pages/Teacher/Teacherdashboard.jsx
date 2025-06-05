import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "../../components/teachers/Summmarycard"; 
import TeacherNavbar from "../../components/Teachers/TeacherNavbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";

const TeacherDashboard = () => {
  const [teacherName, setTeacherName] = useState("");
  const [courses, setCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8082/api/teacher/me", {
          headers: {
            Authorization:` Bearer ${token}`,
          },
        });

        setTeacherName(res.data.name || "Teacher");
        setCourses(res.data.courses || []);
        setTotalStudents(res.data.totalStudents || 0);
        setAverageRating(res.data.averageRating || 0);
      } catch (err) {
        console.error("Error fetching teacher data", err);
      }
    };

    fetchTeacherData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <TeacherNavbar/>
        <main className="p-6 space-y-6">
          {/* Greeting Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6"
          >
            <h1 className="text-2xl font-semibold">
              {getGreeting()}, {teacherName} 👋
            </h1>
            <p className="text-sm mt-1">Welcome back to your dashboard.</p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">Courses</h3>
              <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">Students</h3>
              <p className="text-3xl font-bold text-green-600">{totalStudents}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-700">Rating</h3>
              <p className="text-3xl font-bold text-yellow-500">{averageRating.toFixed(1)} ⭐</p>
            </motion.div>
          </div>

          {/* Add more dashboard sections here as needed */}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default TeacherDashboard;