//view enrolled course,cancel course
import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../style/StudentDashboard.css";

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await API.get("/users/enrolled");
      setEnrolledCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch enrolled courses", err);
    }
  };

  const cancelEnrollment = async (courseId) => {
    try {
      await API.post(`/courses/cancel/${courseId}`);
      setEnrolledCourses(enrolledCourses.filter(c => c._id !== courseId));
    } catch (err) {
      console.error("Failed to cancel enrollment", err);
    }
  };

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  return (
    <div className="student-dashboard-container">
      <h2>My Enrolled Courses</h2>
      <div className="course-list">
        {enrolledCourses.length === 0 ? (
          <p>You haven’t enrolled in any courses yet.</p>
        ) : (
          enrolledCourses.map((course) => (
            <div className="student-course-card" key={course._id}>
              <img src={course.thumbnail} alt="thumbnail" />
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => cancelEnrollment(course._id)}>Cancel Enrollment</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;