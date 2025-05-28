import logo from "../assets/homeImage.jpg"
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex w-full h-[100vh] px-10 py-10 bg-[#c7d2f3] ">
      <div className="flex justify-center lg:w-[50%] h-full w-[100%] ">
        <Outlet />
      </div>
      <div className=" w-[50%] h-full hidden lg:flex ">
        <img src={logo} alt="logo image" className="w-full h-full object-cover rounded-r-xl " />
      </div>
    </div>
  )
}

export default LandingPage
