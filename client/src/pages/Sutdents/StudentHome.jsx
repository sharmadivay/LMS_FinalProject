import { Outlet, Link, NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "../../hooks/getMe";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentWelcome = () => {

  const navigate = useNavigate()

  const handleLogout = async () =>{
     const res = await logout()
     toast.success(res.message)
     navigate("/login")
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <nav className=" flex justify-between items-center bg-indigo-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-semibold">
          🎓 Welcome to LWS Student Portal
        </h1>
        <button className="flex justify-center px-2 cursor-pointer" onClick={handleLogout}>
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" /> Logout
        </button>
      </nav>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-800 text-white py-6 px-4">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/student/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white "
                      : "hover:bg-indigo-600 "
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/student/dashboard"
               className={({ isActive }) =>
                  `px-4 py-2 rounded transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink  to="/student/allcourses"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600"
                  }`
                }>
                All Courses
              </NavLink>
            </li>
            <li>
             <NavLink
                to="/student/courses"
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-600"
                  }`
                }
              >
                My Courses
              </NavLink>
            </li>
          </ul>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-3 text-sm">
        © {new Date().getFullYear()} LWS • Empowering Students for Tomorrow
      </footer>
    </div>
  );
};

export default StudentWelcome;
