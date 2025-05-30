import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../style/CourseList.css";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="course-list-page">
      <h2>All Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img
              src={`http://localhost:8082/uploads/${course.thumbnail}`}
              alt={course.title}
              className="course-thumb"
            />
            <h3>{course.title}</h3>
            <p>{course.description.slice(0, 100)}...</p>
            <Link to={`/course/${course._id}`} className="view-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;