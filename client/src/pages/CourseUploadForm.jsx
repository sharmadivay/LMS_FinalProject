///teacher using to upload new course
//form sent data using multipart/formdata

import React, { useState } from "react";
import API from "../api/api";
import "../styles/CourseUploadForm.css";

const CourseUploadForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [attachments, setAttachments] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (thumbnail) formData.append("thumbnail", thumbnail);

    attachments.forEach(file => formData.append("attachments", file));

    try {
      await API.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Course uploaded successfully!");
      setForm({ title: "", description: "", category: "", price: 0 });
      setThumbnail(null);
      setAttachments([]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Error uploading course.");
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Course Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={handleChange} />

        <label>Thumbnail Image:</label>
        <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />

        <label>Course Attachments (PDF, Image, Video):</label>
        <input type="file" multiple onChange={(e) => setAttachments([...e.target.files])} />

        <button type="submit">Upload Course</button>
      </form>
    </div>
  );
};

export default CourseUploadForm;