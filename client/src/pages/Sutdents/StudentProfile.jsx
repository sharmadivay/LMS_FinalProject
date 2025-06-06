import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../hooks/getMe";
import { FiEdit2 } from "react-icons/fi";

const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");

  const navigate = useNavigate();

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
        console.log(error);
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-full bg-[#F9FAFB] ">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Section */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Profile Header */}

          <div className="flex items-center space-x-4 relative">
            <div className="relative group">
              <img
                src={user.avatar}
                alt="avatar"
                className="h-24 w-24 rounded-full object-cover border border-gray-300"
              />

              {/* Pencil Icon Overlay */}
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-md cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity"
                title="Change Profile Picture"
              >
                <FiEdit2 size={16} />
              </label>

              {/* Hidden file input */}
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log("Selected file:", file);
                    // Add logic here to upload the file
                  }
                }}
              />
            </div>

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
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
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
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={user.phone}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={user.country}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex space-x-6">
                <button className="px-6 py-2 mt-2 bg-blue-100 text-black font-semibold rounded-lg hover:bg-blue-200 transition-all">
                  Update Profile
                </button>
                <button className="px-6 py-2 mt-2 bg-blue-100 text-black font-semibold rounded-lg hover:bg-blue-200 transition-all">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
