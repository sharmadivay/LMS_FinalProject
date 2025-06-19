import axios from 'axios';
import toast from "react-hot-toast";

const couseUrl = "http://localhost:8082/api/teacher";
axios.defaults.withCredentials = true;


export const uploadCourse = async (formData) => {
  try {
    const response = await axios.post('/api/createCourse', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const fetchCourses = async () => {
  try {
    const response = await axios.get('/api/courses');
    return response.data.courses;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/courses/${id}`, updatedData);
    return response.data.course;
  } catch (error) {
    throw error;
  }
};


export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(/api/courses/${id});
    return response.data;
  } catch (error) {
    throw error;
  }
};
