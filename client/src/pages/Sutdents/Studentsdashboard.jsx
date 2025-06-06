import React, { useEffect, useState } from 'react';
 import { motion } from 'framer-motion'; 
 //import Sidebar from '../components/Sidebar';
  import StudentNavbar from '../../components/Student/StudentNavbar';
   import Footer from '../../components/Footer'; 
   import axios from 'axios';

const StudentDashboard = () => { const [studentData, setStudentData] = 
      useState(null); const [loading, setLoading] = 
      useState(true); const [error, setError] = 
      useState(null); const [quote, setQuote] = useState('');

useEffect(() => 
      { const fetchStudentData = async () => 
            { try { const token = localStorage.getItem('token'); 
                  const res = await axios.get('http://localhost:8082/get-users',
                         { headers: { Authorization:` Bearer ${token}`,
                         },
                         });
 setStudentData(res.data);
  setLoading(false); 
} catch  { setError('Failed to load student data'); setLoading(false); } };

const getRandomQuote = () => {
  const quotes = [
    'Keep pushing forward!',
    'Every day is a new opportunity.',
    'Stay hungry. Stay foolish.',
    'Success is no accident.',
    'Learning never exhausts the mind.'
  ];
  setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
};

fetchStudentData();
getRandomQuote();

}, []);

if (loading) 
      return
 <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}
  </div>;

return ( 
<div className="flex min-h-full min-w-full  bg-gray-50"> 
      <div className="flex-1  min-h-full min-w-full  flex flex-col">
           
 <main className="flex-1 p-6 overflow-y-auto"> 
      <motion.div className="bg-white rounded-xl shadow-lg p-8 mb-6" 
      initial={{ opacity: 0, y: -20 }}
       animate={{ opacity: 1, y: 0 }} 
       transition={{ duration: 0.6 }} >
             <h1 className="text-3xl font-bold mb-2 text-indigo-700"> Welcome, {studentData?.name || 'Student'} 🎓 </h1> <p className="text-gray-500 text-lg italic">{quote}</p> </motion.div>


    </main>
  </div>
</div>

); };

export default StudentDashboard;