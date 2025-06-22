
import axios from 'axios';

axios.defaults.withCredentials = true; 

const API_BASE_URL = 'http://localhost:8082/api/course'; 

export const uploadCourse = async (formData) => {
  const res = await axios.post(`${API_BASE_URL}/createCourse`, formData,{
    withCredentials: true
  }, {
    headers: {
      'Content-Type': 'multipart/form-data',
      
    },
  });

  return res.data;
};

// ✅ Fetch all courses
export const fetchCourses = async () => {
  const res = await axios.get(`${API_BASE_URL}/all`);
  return res.data.courses;
};

// ✅ Update an existing course
export const updateCourse = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/update/${id}`, updatedData);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/delete/${id}`);
  return res.data;
};