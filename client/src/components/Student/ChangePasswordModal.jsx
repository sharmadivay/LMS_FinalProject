import { FaTimes } from 'react-icons/fa';

export const ChangePasswordModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 sm:mx-0">

        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition focus:outline-none"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>

        {/* Current Password Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>

        {/* Verify Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition mb-6">
          Verify
        </button>

        {/* Divider with OR */}
        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Change Password with OTP Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
          Change Password with OTP
        </button>
      </div>
    </div>
  );
};
