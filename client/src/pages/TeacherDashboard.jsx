///view course they created,delete course
import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../style/TeacherDashboard.css";

const TeacherDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);

  const fetchMyCourses = async () => {
    try {
      const res = await API.get("/teachers/my-courses");
      setMyCourses(res.data);
    } catch (err) {
      console.error("Error fetching teacher's courses:", err);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await API.delete(`/courses/${courseId}`);
      setMyCourses(myCourses.filter(course => course._id !== courseId));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="teacher-dashboard-container">
      <h2>My Uploaded Courses</h2>
      <div className="teacher-course-list">
        {myCourses.length === 0 ? (
          <p>No courses uploaded yet.</p>
        ) : (
          myCourses.map(course => (
            <div key={course._id} className="teacher-course-card">
              <img src={course.thumbnail} alt="thumbnail" />
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => deleteCourse(course._id)}>Delete Course</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;