/// admin will be able to see course and delete
import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../style/AdminCourseView.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch {
      console.error("Error fetching courses");
    }
  };

  const deleteCourse = async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
      setMessage("Course deleted successfully.");
    } catch {
      console.error("Error deleting course.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="admin-courses-container">
      <h2>All Available Courses</h2>
      {message && <p className="success-message">{message}</p>}
      <div className="course-grid">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <img src={course.thumbnail} alt="thumbnail" />
            <h3>{course.title}</h3>
            <p><strong>Instructor:</strong> {course.instructor?.name}</p>
            <p>{course.description}</p>
            <button onClick={() => deleteCourse(course._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;