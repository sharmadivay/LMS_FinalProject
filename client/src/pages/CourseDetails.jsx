import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "../style/CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleEnroll = () => {
    API.post(`/courses/enroll/${id}`)
      .then(() => setMessage("Enrolled successfully!"))
      .catch((err) => setMessage("Error: " + err.response?.data?.message));
  };

  const handleCancelEnrollment = () => {
    API.post(`/courses/cancel/${id}`)
      .then(() => setMessage("Enrollment canceled."))
      .catch((err) => setMessage("Error: " + err.response?.data?.message));
  };

  const handleRating = () => {
    API.post(`/courses/rate/${id}, { rating }`)
      .then(() => setMessage("Rated successfully!"))
      .catch((err) => setMessage("Error: " + err.response?.data?.message));
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <img
        src={`http://localhost:8082/uploads/${course.thumbnail}`}
        alt={course.title}
        className="course-image"
      />
      <p>{course.description}</p>

      <div>
        <div className="media-section">
          {course.photo && (
            <img
              src={`http://localhost:5000/uploads/${course.photo}`}
              alt="course"
              className="media-preview"
            />
          )}
          {course.video && (
            <video controls className="media-preview">
              <source
                src={`http://localhost:5000/uploads/${course.video}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
          {course.pdf && (
            <a
              href={`http://localhost:5000/uploads/${course.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="media-preview pdf-link"
            >
              View PDF
            </a>
          )}
        </div>

        <div className="actions">
          <button onClick={handleEnroll}>Enroll</button>
          <button onClick={handleCancelEnrollment}>Cancel Enrollment</button>

          <div className="rating-section">
            <input
              type="number"
              value={rating}
              min="1"
              max="5"
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rate (1-5)"
            />
            <button onClick={handleRating}>Submit Rating</button>
          </div>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default CourseDetails;