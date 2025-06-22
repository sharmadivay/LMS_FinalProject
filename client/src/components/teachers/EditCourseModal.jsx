import { useState, useEffect } from 'react';
import { updateCourse, deleteCourse } from '../../hooks/useCourse.js';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
      const res = await updateCourse(course._id, updatedData);
      if(res.success){
       toast.success(res.message);
      }else{
        toast.error(res.message)
      }
      
      onUpdate();
      onClose();
    } catch {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-30 p-4 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Course</h2>

        {/* Input Field */}
        <div className="space-y-4">
          <Input label="Title" value={title} onChange={setTitle} />
          <TextArea label="Description" value={description} onChange={setDescription} />
          <Input label="Category" value={category} onChange={setCategory} />
          <Input label="Price" value={price} onChange={setPrice} type="number" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleDelete}
            className="text-sm px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Reusable Input
const Input = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Reusable TextArea
const TextArea = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <textarea
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default EditCourseModal;
