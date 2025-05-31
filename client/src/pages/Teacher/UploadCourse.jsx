import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

import TeacherNavbar from "../../components/Teachers/TeacherNavbar";
import Footer from "../../components/Footer";

const UploadCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null,
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("description", formData.description);
    uploadData.append("thumbnail", formData.thumbnail);
    uploadData.append("video", formData.video);
    uploadData.append("attachment", formData.attachment);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/teacher/upload-course",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        setSuccessMsg("✅ Course uploaded successfully!");
        setFormData({
          title: "",
          description: "",
          thumbnail: null,
          video: null,
          attachment: null,
        });
      } else {
        setErrorMsg("❌ Something went wrong. Try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("⚠ Server error! Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#edf2fb] to-[#dbe7ff]">
      {/* <Sidebar /> */}
      <div className="flex flex-col flex-1">
        <TeacherNavbar/>

        <main className="flex-1 p-6">
          <motion.div
            className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md p-10 shadow-xl rounded-3xl border border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
              <FiUploadCloud className="inline mr-2 text-4xl" />
              Upload New Course
            </h2>

            {successMsg && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center font-medium shadow">
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-medium shadow">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />

              <FloatingTextarea
                label="Course Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <FileInput
                label="Thumbnail Image"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
              />

              <FileInput
                label="Course Video"
                name="video"
                accept="video/*"
                onChange={handleChange}
              />

              <FileInput
                label="Attachment (PDF/PPT)"
                name="attachment"
                accept=".pdf,.ppt,.pptx"
                onChange={handleChange}
              />

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full bg-indigo-600 text-white text-lg py-3 rounded-xl shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Upload Course"}
              </motion.button>
            
            
            </form>
          </motion.div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

const FloatingInput = ({ label, name, value, onChange }) => (
  <div className="relative z-0 w-full group">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
      className="block py-3 px-2 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
      placeholder=" "
    />
    <label
      htmlFor={name}
      className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const FloatingTextarea = ({ label, name, value, onChange }) => (
  <div className="relative z-0 w-full group">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required
      rows="4"
      placeholder=" "
      className="block py-3 px-2 w-full text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer resize-none"
    />
    <label
      htmlFor={name}
      className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-2 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      {label}
    </label>
  </div>
);

const FileInput = ({ label, name, accept, onChange }) => (
  <div className="w-full">
    <label className="block text-md font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={onChange}
      required
      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
    />
  </div>
);

export default UploadCourse;