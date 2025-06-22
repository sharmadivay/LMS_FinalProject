import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../../hooks/getMe";
import { fetchCourses } from "../../hooks/useCourse.js";
const StudentHome = () => {
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      if (res.success) {
        setName(res.user.name);
      } else {
        toast.error(res.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data || []);
    } catch {
      // toast.error("Failed to fetch courses");
    }
  };

  useEffect(() => {
    fetchUser();
    loadCourses()
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen  p-p t-0 ">
      <h3 className="text-4xl font-bold mb-8">Welcome back, {name}</h3>
      {/* Hero Section */}
      <div className="bg-[#f0e6de] rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2016/04/19/20/43/laptop-1335741_960_720.png"
          alt="Hero"
          className="absolute right-10 bottom-0 h-64 lg:h-72 opacity-60"
        />
        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to NextPath
          </h1>
          <p className="text-gray-600 mb-6">
            Explore a wide range of courses and enhance your skills with expert
            instructors.
          </p>
          <button className="bg-blue-100 text-black font-semibold px-6 py-2 rounded-lg hover:bg-blue-200 transition-all">
            <Link to="/student/allcourses"> Browse Courses</Link>
          </button>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="mt-12">
        {/* Heading + Button Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Courses</h2>
          <button className="bg-blue-100 text-black font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-all">
            <Link to="/student/courses">View More</Link>
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://imgs.search.brave.com/LlB_ZIANW9ElStZ5U47cRU6Oxn8tcqGsQkDUmGxgDa0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTI2/NTMzODYwNi92ZWN0/b3IvZGlnaXRhbC1t/YXJrZXRpbmctYmFu/bmVyLWNvbmNlcHQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW5rcUh3Qi1MeHd1/OHJwbGtELURWbWVq/cXdpdjdHajNDbnFK/WUY2U1pscFE9"
              alt="Course 1"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">
              Digital Marketing Fundamentals
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Learn the basics of digital marketing.
            </p>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://imgs.search.brave.com/FyZbpzoNhmo_uUS8_GHGURQcFlvEWDz5oSMbF7qkZng/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZWNvZGVjYW1w/Lm9yZy9uZXdzL2Nv/bnRlbnQvaW1hZ2Vz/L3NpemUvdzIwMDAv/MjAyMi8wOC9mcm9u/dGVuZC5wbmc"
              alt="Course 2"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Web Development Bootcamp</h3>
            <p className="text-sm text-gray-500 mt-1">
              Build modern web applications.
            </p>
          </div>

          {/* Course Card 3 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://imgs.search.brave.com/Y7mrhjwwfQfAU2sxancc4cWidv2AJjgfR6sAKcnFuts/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kdG12/YW1haHM0MHV4LmNs/b3VkZnJvbnQubmV0/L2dsLWFjYWRlbXkv/Y291cnNlL2NvdXJz/ZS0zNjYtZGF0YSUy/MHZpeiUyMHVzaW5n/JTIwcG93ZXIlMjBi/aSUyMGluJTIwaGlu/ZGkuanBn"
              alt="Course 3"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Data Science Essentials</h3>
            <p className="text-sm text-gray-500 mt-1">
              Master the fundamentals of data science.
            </p>
          </div>
        </div>
      </div>

      {/* Resent Courses Section */}
      {/* Recent Courses Section */}
      <div className="mt-12">
        {/* Heading + Button Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Courses</h2>
          <button className="bg-blue-100 text-black font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-all">
            <Link to="/student/courses">View More</Link>
          </button>
        </div>

        {/* Conditional Rendering for Courses */}
        {courses.length === 0 ? (
          <p className="text-gray-500 text-center">No courses uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <img
                  src={
                    course.thumbnail ||
                    "https://via.placeholder.com/300x200.png?text=No+Image"
                  }
                  alt={course.title}
                  className="rounded-xl mb-4 h-40 object-cover w-full"
                />
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {course.description?.slice(0, 60) ||
                    "No description available."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHome;
