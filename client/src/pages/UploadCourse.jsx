import React, { useState } from "react";
import API from "../api/api";
import "../style/UploadCourse.css";

const UploadCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });
  const [files, setFiles] = useState({
    thumbnail: null,
    video: null,
    pdf: null,
    photo: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    for (const file in files) {
      if (files[file]) {
        data.append(file, files[file]);
      }
    }

    try {
      await API.post("/courses", data);
      setMessage("Course uploaded successfully!");
    } catch {
      setMessage("Error uploading course.");
    }
  };

  return (
    <div className="upload-course-container">
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit} className="upload-course-form">
        <input type="text" name="title" placeholder="Course Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Course Description" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} />

        <label>Thumbnail Image:</label>
        <input type="file" name="thumbnail" accept="image/*" onChange={handleFileChange} />

        <label>Optional Video:</label>
        <input type="file" name="video" accept="video/*" onChange={handleFileChange} />

        <label>Optional PDF:</label>
        <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} />

        <label>Optional Image:</label>
        <input type="file" name="photo" accept="image/*" onChange={handleFileChange} />

        <button type="submit">Upload</button>
        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
};

export default UploadCourse;