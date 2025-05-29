import { useState } from "react";
import Navbar from "../../components/Student/navbar";



const studentPage = ({ user }) => {
  const [checkAvatar, setCheckAvatar] = useState(
    "https://res.cloudinary.com/duecnsulw/image/upload/v1748502713/wa8tmkxplsd0kgzw478b.avif"
  );
  const { name, email, avatar } = user;
  if (avatar != "") {
    setCheckAvatar(avatar);
  }
  return (
    <div className="flex w-full h-[100vh] px-10 py-10 bg-[#c7d2f3]">
      <div className="w-full p-4 rounded-xl bg-[rgb(245,246,250,0.5)]">
        <div className=" flex w-full h-full rounded-xl bg-[#fffefe]">

          {/* Sidebar */}
          <div className="w-[20%] h-full border-r">
            <div className="border-b h-[60px] flex items-center justify-center font-bold">
              <img
                src="https://res.cloudinary.com/duecnsulw/image/upload/v1748505977/zftayazwswtvuohefhb2.jpg"
                alt="image"
                className="h-12 w-12 rounded-full"
              />
              <p>LMS</p>
            </div>
            <ul className="flex flex-col items-center">
              <li>Overview</li>
              <li>Courses</li>
              <li>My Courses</li>
            </ul>
          </div>

          {/* right part  */}
          <div className="w-[80%]">
            <div className="h-[60px] border-b">
              <Navbar user={user} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default studentPage;
