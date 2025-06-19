import React, { useState, useEffect, useRef } from 'react';
import { uploadCourse, fetchCourses } from '../../hooks/course';
import EditCourseModal from './EditCourseModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadCourse = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  
  const attachInputRef = useRef(null);


  useEffect(() => {
    loadCourses();
  }, []);

  
  const loadCourses = async () => {
    try {
      const data = await fetchCourses(); 
      setCourses(data || []);
    } catch  {
      toast.error('Failed to fetch courses');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });
    try {
      await uploadCourse(formData); 
      toast.success('Course created successfully');
      
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      setThumbnailFile(null);
      setThumbnailPreview('');
      setAttachments([]);
      
      loadCourses();
    } catch{
      toast.error('Failed to upload course');
    }
  };

  
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  
  const handleAttachmentsChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  
  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsEditing(true);
  };

  
  const closeModal = () => {
    setIsEditing(false);
    setEditingCourse(null);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Course Upload</h1>
      {/* Course Upload Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-6 rounded-lg shadow-md mb-6">
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Upload Course</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course title"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course description"
            required
          />
        </div>
        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in USD"
            required
          />
        </div>
        {/* Thumbnail with live preview */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mb-2"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 h-32 object-cover"
            />
          )}
        </div>
        {/* Attachments drag-and-drop area */}
        <div
          className={`mb-4 border-dashed border-2 p-4 text-center rounded ${dragActive ? 'border-blue-500' : 'border-gray-300'}`}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => attachInputRef.current.click()}
        >
          {dragActive ? 'Drop files here...' : 'Drag & drop attachments here, or click to select files'}
          <input
            ref={attachInputRef}
            type="file"
            multiple
            onChange={handleAttachmentsChange}
            className="hidden"
          />
        </div>
        {/* List selected attachment filenames */}
        {attachments.length > 0 && (
          <ul className="list-disc list-inside mb-4">
            {attachments.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Course
        </button>
      </form>

      {/* Uploaded Course List */}
      <h2 className="text-xl font-bold mb-4">Uploaded Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md p-4 flex">
            {/* Course Thumbnail */}
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt="Course Thumbnail"
                className="h-24 w-24 object-cover rounded mr-4"
              />
            )}
            <div className="flex-grow">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-sm text-gray-600">{course.description}</p>
              <p className="text-sm text-gray-600">Category: {course.category}</p>
              <p className="text-sm text-gray-600">Price: ${course.price}</p>
            </div>
            <div className="flex flex-col justify-between">
              <button
                onClick={() => handleEdit(course)}
                className="bg-green-500 text-white px-3 py-1 rounded self-end"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Course Modal */}
      {isEditing && (
        <EditCourseModal
          isOpen={isEditing}
          course={editingCourse}
          onClose={closeModal}
          onUpdate={loadCourses} // Callback to refresh courses after edit/delete
        />
      )}

      {/* Toast container for notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UploadCourse;