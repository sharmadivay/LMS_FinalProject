import { useEffect, useState } from "react";
import { getMe } from "../../hooks/getMe";
import toast from "react-hot-toast";

const Profile = () => {
  const [student, setStudent] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getMe();
      if (res.success) {
        setStudent(res.user);
      } else {
        toast.error(res.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-w-full min-h-full mx-auto bg-transparent p-8 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt="avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <p className="text-gray-500">{student.email}</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700">
          Edit
        </button>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 mb-1">Full Name</label>
          <div  className="w-full p-3 rounded-md bg-gray-100 text-gray-700">
           {student.name}
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <div
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700"
          >{student.email}</div>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Gender</label>
           <div
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700"
          >{student.gender}</div>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Country</label>
           <div
            className="w-full p-3 rounded-md bg-gray-100 text-gray-700"
          >{student.country}</div>
        </div>
        
      </form>
    </div>
  );
};

export default Profile;
