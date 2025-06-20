import { useState, useEffect, useRef } from "react";
import { Plus, Search, X, ImagePlus, FilePlus, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import EditCourseModal from "../../components/teachers/EditCourseModal.jsx";
import { uploadCourse, fetchCourses } from "../../hooks/useCourse.js";

const categories = [
  "Web Development",
  "Backend",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "Marketing",
];

 const UploadCourse = () => {
  // ─── Data ────────────────────────────────────────────────────────────────
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const attachInputRef = useRef(null);

  // ─── Effects ─────────────────────────────────────────────────────────────
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data || []);
    } catch {
      // toast.error("Failed to fetch courses");
    }
  };

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);
    attachments.forEach((file) => formData.append("attachments", file));

    try {
      await uploadCourse(formData);
      toast.success("Course created successfully");
      resetForm();
      setIsFormOpen(false);
      loadCourses();
    } catch {
      toast.error("Failed to upload course");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setPrice("");
    setThumbnailFile(null);
    setThumbnailPreview("");
    setAttachments([]);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  const handleAttachmentsChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsEditing(true);
  };

  const filteredCourses = courses.filter((course) =>
    `${course.title} ${course.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-w-full min-h-full bg-transparent p-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> Upload Course
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by title or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 flex flex-col"
          >
            {course.thumbnail && (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full object-cover max-h-48"
              />
            )}
            <div className="p-4 flex flex-col gap-2 flex-1">
              <h3 className="text-lg font-semibold line-clamp-2 min-h-[48px]">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                {course.description}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Category:</strong> {course.category}
              </p>
              <p className="text-sm text-gray-700 mt-auto">
                <strong>Price:</strong> ${course.price}
              </p>
              <button
                onClick={() => handleEdit(course)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-max self-end"
              >
                Edit
              </button>
            </div>
          </div>
        ))}

        {filteredCourses.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No courses found.
          </p>
        )}
      </div>

      {/* Upload Course Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 backdrop-blur-sm animate-fadeIn"
          onClick={() => {
            setIsFormOpen(false);
            resetForm();
          }}
        >
          <div
            className="relative max-h-full w-full max-w-2xl overflow-y-auto rounded-2xl bg-white  p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              aria-label="Close"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setIsFormOpen(false);
                resetForm();
              }}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="mb-6 text-xl font-bold">Upload Course</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Title</label>
                <input
                  type="text"
                  placeholder="Amazing React Course"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Description</label>
                <textarea
                  placeholder="What will students learn?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[96px] resize-y rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              {/* Category & Price */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg border px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium">Price (USD)</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="49.99"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full rounded-lg border pl-8 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Thumbnail */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Thumbnail</label>
                {!thumbnailPreview ? (
                  <label
                    className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-blue-500"
                  >
                    <ImagePlus className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Click to upload a cover image</span>
                    <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden" />
                  </label>
                ) : (
                  <div className="relative w-full max-h-52 overflow-hidden rounded-lg">
                    <img src={thumbnailPreview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-red-500 backdrop-blur hover:bg-white"
                      onClick={removeThumbnail}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Attachments */}
              <div className="flex flex-col gap-1">
                <label className="font-medium">Attachments</label>
                <div
                  className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500"
                  }`}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => attachInputRef.current?.click()}
                >
                  <FilePlus className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {dragActive ? "Drop files here…" : "Click or drag files to attach"}
                  </p>
                  <input ref={attachInputRef} type="file" multiple onChange={handleAttachmentsChange} className="hidden" />
                </div>

                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((file, idx) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between rounded-md bg-gray-100 px-3 py-2 text-sm"
                      >
                        <span className="truncate pr-2">{file.name}</span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeAttachment(idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="rounded-lg border bg-white px-5 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <EditCourseModal
          isOpen={isEditing}
          course={editingCourse}
          onClose={() => {
            setIsEditing(false);
            setEditingCourse(null);
          }}
          onUpdate={loadCourses}
        />
      )}
    </div>
  );
}

export default UploadCourse