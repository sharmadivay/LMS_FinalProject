import { useEffect, useState } from "react";
import { getMe } from "../../hooks/getMe";
import toast from "react-hot-toast";
import { logout } from "../../hooks/getMe";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import {
  FiHome,
  FiPlayCircle,
  FiBookOpen,
  FiSettings,
  FiShoppingCart,
} from "react-icons/fi";

import { FiLogOut } from "react-icons/fi";
const TeacherPage = () => {
  const [teacher, setTeacher] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const fetchTeacher = async () => {
    try {
      const res = await getMe();
      if (res.success) {
        setTeacher(res.user);
        setRole(res.role);
      } else {
        toast.error(res.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

   const navItems = [
    { label: "Home", icon: <FiHome size={20} /> , route : "/teacher" },
    { label: "My Learning", icon: <FiBookOpen size={20}  /> , route: "/teacher/courses"},
    { label: "My Courses", icon: <FiBookOpen size={20}  /> , route: "/teacher/mycourses"},
    { label: "All Courses", icon: <FiPlayCircle size={20} />  , route: "/teacher/allcourses"},
    { label: "Cart", icon: <FiShoppingCart size={20} />  , route: "/teacher/cart"},
    { label: "Settings", icon: <FiSettings size={20} />  , route: "/teacher/profile"},
     
     
  ];

  useEffect(() => {
    fetchTeacher();
  }, []);

  return <div className="bg-[#F9FAFB] min-h-screen w-full flex">
      {/* Sidebar */}
      <div className=" relative w-[250px] min-h-screen p-6 bg-[#F9FAFB]">
        {/* Profile Section */}
        <NavLink to="/student" className="flex items-center space-x-3 mb-10 cursor-pointer" >
          <img
            src={teacher.avatar || "https://res.cloudinary.com/duecnsulw/image/upload/v1748502713/wa8tmkxplsd0kgzw478b.avif"}
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-md font-semibold">{teacher.name || "Emily Wong"}</h3>
            <p className="text-sm text-gray-500">{role || "Student"}</p>
          </div>
        </NavLink>

        {/* Navigation */}
        <div className="space-y-4">
          {navItems.map(({ label, icon , route}) => (
            <NavLink
              key={label}
              to= {route}
               end={route === "/teacher"} 
              className={({isActive})=>`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${
                isActive
                  ? "bg-gray-100 text-black"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        {/* Admin Link */}
        <div className="absolute bottom-10 left-6  flex items-center gap-2 text-sm text-gray-500 cursor-pointer" onClick={handleLogout}>
          <FiLogOut size={24} />
          <span className="text-lg">Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className=" bg-[#F9FAFB] flex-1 p-10">   
          <Outlet />
      </div>
    </div>;
};

export default TeacherPage;
