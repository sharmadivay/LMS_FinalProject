import { useEffect, useState } from "react";
import { getMe } from "../../hooks/getMe";
import { Outlet, useNavigate , NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../../hooks/getMe";
import {
  FiHome,
  FiPlayCircle,
  FiBookOpen,
  FiSearch,
  FiSettings,
  FiShoppingCart
} from "react-icons/fi";

import { FiLogOut } from "react-icons/fi";

const StudentPage = () => {
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () =>{
    await logout()
    navigate("/")
  }



  const navItems = [
    { label: "Home", icon: <FiHome size={20} /> , route : "/student" },
    { label: "My Learning", icon: <FiBookOpen size={20}  /> , route: "/student/courses"},
    { label: "All Courses", icon: <FiPlayCircle size={20} />  , route: "/student/allcourses"},
    { label: "Cart", icon: <FiShoppingCart size={20} />  , route: "/student/profile"},
     { label: "Settings", icon: <FiSettings size={20} />  , route: "/student/profile"},
     
     
  ];

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
        navigate("/");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen w-full flex">
      {/* Sidebar */}
      <div className=" relative w-[250px] min-h-screen p-6 bg-[#F9FAFB]">
        {/* Profile Section */}
        <NavLink to="/student" className="flex items-center space-x-3 mb-10 cursor-pointer" >
          <img
            src={user.avatar}
            alt="avatar"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-md font-semibold">{user.name || "Emily Wong"}</h3>
            <p className="text-sm text-gray-500">{role || "Student"}</p>
          </div>
        </NavLink>

        {/* Navigation */}
        <div className="space-y-4">
          {navItems.map(({ label, icon , route}) => (
            <NavLink
              key={label}
              to= {route}
              end={route === "/student"}
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
    </div>
  );
};

export default StudentPage;
