import React, { useEffect, useState } from "react";
import axios from "axios";
//import Sidebar from '../components/Sidebar';
import TeacherNavbar from "../../components/Teachers/TeacherNavbar";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/course/all");
        setCourses(response.data.courses);
        setFilteredCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSort = (type) => {
    setSortType(type);
    let sorted = [...courses];
    if (type === "priceLow") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "priceHigh") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted = [...courses];
    }
    setFilteredCourses(sorted);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      //sidebar
      <div className="flex-1 flex flex-col">
        <TeacherNavbar />
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Available Courses</h1>
            <select
              onChange={(e) => handleSort(e.target.value)}
              value={sortType}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="default">Sort By</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses && filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                {" "}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-blue-600 mb-2">
                    {course.title}{" "}
                  </h2>
                  <p className="text-gray-700 mb-2">{course.description}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {" "}
                    Teacher: {course.teacherName || "Unknown"}
                  </p>
                  <p className="text-md font-bold">
                    {" "}
                    {course.isFree ? "Free" : `₹${course.price}`}
                  </p>
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-all">
                    {" "}
                    Enroll{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      
      </div>
    </div>
  );
};

export default AllCourses;
