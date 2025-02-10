import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { Clipboard, Save } from "lucide-react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-center mb-8">
            <Clipboard className="w-8 h-8 mr-3 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {pasteId ? "Update Your Paste" : "Create New Paste"}
            </h1>
          </div>

          {/* Main Content Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden backdrop-blur-sm backdrop-filter">
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                  type="text"
                  placeholder="Enter a descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content Textarea */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Content</label>
                <textarea
                  className="w-full h-80 px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white 
                           placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                           transition duration-200 ease-in-out resize-none"
                  placeholder="Type or paste your content here..."
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>

              {/* Action Button */}
              <button
                onClick={createPaste}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 
                         hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transform 
                         transition-all duration-200 ease-in-out hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <Save className="w-5 h-5" />
                {pasteId ? "Update Paste" : "Create Paste"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;