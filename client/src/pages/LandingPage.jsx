import React from "react";
import logo from "../assets/homeImage.jpg";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex min-h-full">
      <div className="flex justify-center w-[50%] min-h-full ">
        <Outlet />
      </div>
      <div className="w-[50%]">
        <img src={logo} alt="logo image" className="w-full h-[100vh] " />
      </div>
    </div>
  );
};

export default LandingPage;
