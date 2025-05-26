import logo from "../assets/homeImage.jpg";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex w-full h-[100vh] px-10 py-10 bg-[#f5f6f8]">
      <div className="flex justify-center w-[50%] h-full ">
        <Outlet />
      </div>
      <div className="w-[50%] h-full ">
        <img src={logo} alt="logo image" className="w-full h-full object-cover rounded-r-xl " />
      </div>
    </div>
  )
}

export default LandingPage
