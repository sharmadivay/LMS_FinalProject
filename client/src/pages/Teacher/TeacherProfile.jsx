import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../hooks/getMe";
import { avatar , updateUser } from "../../hooks/users";
import { FiEdit2 } from "react-icons/fi";
import { ChangePasswordModal } from "../../components/Student/ChangePasswordModal";

import toast from "react-hot-toast";


const TeacherProfile = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country,setCountry] = useState('')
  const [image,setImage] = useState('')
  const [isPasswordChange,setIsPasswordChange] = useState(false)

  const [isUpdate, setIsUpdate] = useState(false)
  
  const [isUploading,setIsUploading] = useState(false)

  const navigate = useNavigate();

  const fetchUser = async () => {
      try {
        const res = await getMe();
        if (res.success) {
          setRole(res.role);
          setName(res.user.name)
          setEmail(res.user.email)
          setPhone(res.user.phone)
          setCountry(res.user.country)
          setImage(res.user.avatar)
        } else {
          toast.error(res.message);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

  const handleImage = async (image) =>{
    const res = await avatar(image)
    if(res.success){
      toast.success(res.message)
      await fetchUser()
      setIsUploading(false)
    }else{
      toast.error(res.message)
    }
  }

  const handleUpdate = async () =>{
    if(!isUpdate){
      setIsUpdate(true)
    }else{
      const data = {
        name,
        phone,
        country
      }
      const res = await updateUser(data)
      if(res.success){
        toast.success(res.message)
        
      }else{
        toast.error(res.message)
      }
      setIsUpdate(false)
    }
    
  }

  const handleChangePassword = async (e) =>{
    e.preventDefault()
     setIsPasswordChange(true)
  }

  useEffect(() => {
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
                src={image || "https://res.cloudinary.com/duecnsulw/image/upload/v1748502713/wa8tmkxplsd0kgzw478b.avif"}
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
                 disabled={isUploading}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setIsUploading(true)
                    handleImage(file) 
                  }
                }}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">{name }</h2>
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
                  value={name || "User"}
                  disabled={!isUpdate}
                  onChange={(e)=>setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email || "example@gmail.com"}
                   disabled = {true}
                   onChange={(e)=>setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone || "1234567890"}
                  disabled={!isUpdate}
                  onChange={(e)=>setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={country || "India"}
                  disabled={!isUpdate}
                  onChange={(e)=>setCountry(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex space-x-6">
                <button className="px-6 py-2 mt-2 bg-blue-100 text-black font-semibold rounded-lg hover:bg-blue-200 transition-all" onClick={handleUpdate}>
                 {isUpdate ? "Save Changes" : "Update Profile"} 
                </button>
                <button className="px-6 py-2 mt-2 bg-blue-100 text-black font-semibold rounded-lg hover:bg-blue-200 transition-all" onClick={handleChangePassword}>
                  Change Password
                </button>
              </div>
              { isPasswordChange &&
                <ChangePasswordModal onClose={() => setIsPasswordChange(false)}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
