import { Link} from "react-router-dom";

const StudentHome = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen p-6">
      {/* Hero Section */}
      <div className="bg-[#f0e6de] rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2016/04/19/20/43/laptop-1335741_960_720.png"
          alt="Hero"
          className="absolute right-10 bottom-0 h-64 lg:h-72 opacity-60"
        />
        <div className="z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to NextPath
          </h1>
          <p className="text-gray-600 mb-6">
            Explore a wide range of courses and enhance your skills with expert
            instructors.
          </p>
          <button className="bg-blue-100 text-black font-semibold px-6 py-2 rounded-lg hover:bg-blue-200 transition-all">
            <Link to="/student/allcourses"> Browse Courses</Link>
          </button>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="mt-12">
        {/* Heading + Button Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Courses</h2>
          <button className="bg-blue-100 text-black font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-all">
            <Link  to="/student/courses" >View More</Link>
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/10/19/05/marketing-1974928_960_720.jpg"
              alt="Course 1"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">
              Digital Marketing Fundamentals
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Learn the basics of digital marketing.
            </p>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/11/17/41/development-5158025_960_720.png"
              alt="Course 2"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Web Development Bootcamp</h3>
            <p className="text-sm text-gray-500 mt-1">
              Build modern web applications.
            </p>
          </div>

          {/* Course Card 3 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2022/03/22/20/44/data-7086335_960_720.png"
              alt="Course 3"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Data Science Essentials</h3>
            <p className="text-sm text-gray-500 mt-1">
              Master the fundamentals of data science.
            </p>
          </div>
        </div>
      </div>

      {/* Resent Courses Section */}
      <div className="mt-12">
        {/* Heading + Button Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Courses</h2>
          <button className="bg-blue-100 text-black font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-all">
           <Link to="/student/courses"> View More</Link>
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Course Card 1 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2017/01/10/19/05/marketing-1974928_960_720.jpg"
              alt="Course 1"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">
              Digital Marketing Fundamentals
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Learn the basics of digital marketing.
            </p>
          </div>

          {/* Course Card 2 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/11/17/41/development-5158025_960_720.png"
              alt="Course 2"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Web Development Bootcamp</h3>
            <p className="text-sm text-gray-500 mt-1">
              Build modern web applications.
            </p>
          </div>

          {/* Course Card 3 */}
          <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition">
            <img
              src="https://cdn.pixabay.com/photo/2022/03/22/20/44/data-7086335_960_720.png"
              alt="Course 3"
              className="rounded-xl mb-4 h-40 object-cover w-full"
            />
            <h3 className="font-semibold text-lg">Data Science Essentials</h3>
            <p className="text-sm text-gray-500 mt-1">
              Master the fundamentals of data science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
