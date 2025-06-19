import { useState } from "react";
//import { Search } from "lucide-react";

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn the basics of React.js with hands-on projects.",
      thumbnail:
        "https://res.cloudinary.com/duecnsulw/image/upload/v1724299539/masg1r0mw8shrnkfbio6.png",
      instructor: "John Doe",
      category: "Web Development",
      price: 49.99,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Advanced Node.js",
      description: "Master backend development with Node.js.",
      thumbnail:
        "https://res.cloudinary.com/duecnsulw/image/upload/v1747845352/avatars/bjrcxkpyv6ln5usnu9yu.jpg",
      instructor: "Jane Smith",
      category: "Backend",
      price: 59.99,
      rating: 4.7,
    },
    // Add more courses as needed
  ];

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.instructor} ${course.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-w-full min-h-full bg-transparent p-6">
      <h2 className="text-2xl font-bold mb-4">My Courses</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search by title, instructor, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full object-cover"
              style={{ maxHeight: "180px" }}
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-gray-600 text-sm">{course.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Category:</strong> {course.category}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Rating:</strong> ⭐ {course.rating}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-green-600">
                  ${course.price}
                </span>
                <button className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
