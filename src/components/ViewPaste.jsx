import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const paste = allPaste.filter((p) => p._id === id)[0];

  if (!paste) {
    return <div className="text-center text-red-500 text-xl mt-10">Paste not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Wider container */}
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-8">
          <input
            className="w-full p-3 rounded-lg bg-gray-800 text-white text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
            type="text"
            placeholder="Enter the title"
            value={paste.title}
            disabled
          />
        </div>

        {/* Content Section */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <textarea
            className="w-full p-4 rounded-lg bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75"
            value={paste.content}
            placeholder="Enter content here"
            disabled
            rows={20}
          />
        </div>

        {/* Optional: Add a back button or other actions */}
        <div className="mt-8 text-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;