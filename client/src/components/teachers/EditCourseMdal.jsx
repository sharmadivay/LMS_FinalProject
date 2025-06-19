import React, { useState, useEffect } from 'react';
import { updateCourse, deleteCourse } from '../hooks/useCourses';
/*import { motion } from 'framer-motion';*/
import { toast } from 'react-toastify';


const EditCourseModal = ({ isOpen, course, onClose, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  
  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setCategory(course.category);
      setPrice(course.price);
    }
  }, [course]);

  
  const handleSave = async () => {
    try {
      const updatedData = { title, description, category, price };
      await updateCourse(course._id, updatedData); 
      toast.success('Course updated successfully');
      onUpdate();  
      onClose();
    } catch  {
      toast.error('Failed to update course');
    }
  };

  
  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
    if (!confirmed) return;
    try {
      await deleteCourse(course._id); 
      toast.success('Course deleted successfully');
      onUpdate(); 
      onClose();
    } catch {
      toast.error('Failed to delete course');
    }
  };


  if (!isOpen) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Animated modal panel */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* Action buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditCourseModal;