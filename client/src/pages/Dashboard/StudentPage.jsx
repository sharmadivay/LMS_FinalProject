import { useEffect, useState } from "react";
import Navbar from "../../components/Student/navbar";

import {
  PiSquaresFourBold,
  PiSparkleBold,
  PiBookOpenBold,
  PiHeartBold,
  PiUserFocusBold,
  PiMonitorBold,
  PiLightningBold,
  PiCaretDownBold,
  PiCaretUpBold,
} from "react-icons/pi";

import { FiSearch } from "react-icons/fi"

const StudentPage = ({ user }) => {
   const [showCourses, setShowCourses] = useState(false);
  
  return (
    <div className="flex w-full h-[100vh] px-10 py-10 bg-[#c7d2f3]">
      <div className="w-full p-4 rounded-xl bg-[rgb(245,246,250,0.5)]">
        <div className=" flex w-full h-full rounded-xl bg-[#fffefe]">

          {/* Sidebar */}
          <div className="w-[20%] h-full border-r">
            <div className="border-b h-[60px] flex items-center  font-bold">
              <img
                src="https://res.cloudinary.com/duecnsulw/image/upload/v1748505977/zftayazwswtvuohefhb2.jpg"
                alt="image"
                className="h-12 w-12 rounded-full ml-8"
              />
              <p>Personal-LMS</p>
            </div>
            <ul className="flex flex-col ml-16 mt-4 space-y-4 cursor-pointer">
              <li className="flex items-center p-x-4">  <PiSquaresFourBold className="mr-2" /> Overview </li>
              <li className="flex flex-col " onClick={()=> setShowCourses(!showCourses)}>  <div className="flex items-center ">
                <PiSparkleBold className="mr-2"/> <span className="mr-2">Courses</span> {showCourses ? <PiCaretUpBold /> : <PiCaretDownBold />}
              </div>
               {showCourses && (
            <ul className="pl-6 mt-1 space-y-1 text-gray-500">
              <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                <PiBookOpenBold />
                Top course
              </li>
              <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                <PiHeartBold />
                Heart course
              </li>
              <li className="flex items-center gap-2 hover:text-black cursor-pointer">
                <PiUserFocusBold />
                Chest course
              </li>
            </ul>
          )}
          </li>
              <li className="flex items-center p-x-4">   <PiMonitorBold  className="mr-2"/> My Courses</li>
              <li className="flex items-center p-x-4">  <PiLightningBold  className="mr-2"/> Learning Progress</li>
            </ul>
          </div>

          {/* right part  */}
          <div className="w-[80%]">
            <div className="h-[60px] border-b">
              <Navbar user={user} />
            </div>
            <div className="bg-[#FEFBF9] h-[calc(100%-60px)]">
              <div className="flex items-center bg-[#F3F0EE] rounded-full w-60 mt-4 ml-4"> <FiSearch className="ml-4" size={20}/> <input type="text" placeholder="Search" className="px-1 py-2 focus:outline-none focus:ring-0 hover:border-none" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
