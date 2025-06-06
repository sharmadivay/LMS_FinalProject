import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../hooks/getMe";


const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");

  const navigate = useNavigate()

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.success) {
          setUser(res.user);
          setRole(res.role);
        } else {
          toast.error(res.message);
          navigate("/");
        }
      } catch (error) {
        console.log(error)
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-full bg-[#F9FAFB] ">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
   {console.log(user)}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={user.location}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Account Settings */}
        <div className="w-full lg:w-[30%] mt-10 lg:mt-0">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <button className="px-6 py-2 mt-2 bg-blue-100 text-black font-semibold rounded-lg hover:bg-blue-200 transition-all">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
