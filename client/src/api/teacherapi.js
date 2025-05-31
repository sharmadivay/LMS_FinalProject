// src/api/teacherApi.js
import axios from "axios";

const BASE_URL = "http://localhost:8082/api"; 

export const getTeacherProfile = async (token) => {
  const res = await axios.get(`${BASE_URL}/getMe`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getTeacherCourses = async (teacherId, token) => {
  const res = await axios.get(`${BASE_URL}/courses/teacher/${teacherId}`, {
    headers: { Authorization: `Bearer${token}` },
  });
  return res.data;
};