import React, { useEffect, useState } from 'react'
import { FaPowerOff } from "react-icons/fa";

const Navbar = ({user}) => {
    const [checkAvatar, setCheckAvatar] = useState(
        "https://res.cloudinary.com/duecnsulw/image/upload/v1748502713/wa8tmkxplsd0kgzw478b.avif"
      );
      const { name, email, avatar } = user;
      useEffect(() => {
          if (avatar !== "") {
            setCheckAvatar(avatar);
          }
        }, []); 
  return (
    <div className='flex items-center space-x-2 justify-end  p-2'>
       <img src={checkAvatar} alt="Profile" className='h-10 w-10 rounded-full'/>
       <h3 className='font-semibold mr-4'>{name}</h3>
      <button className='text-gray-500 hover:text-red-800 flex items-center gap-2 mr-4'> <FaPowerOff /></button>

    </div>
  )
}

export default Navbar
