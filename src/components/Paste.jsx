import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Search, Pencil, Trash2, Eye, Copy, Share2, Clock } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste && paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            className="w-full bg-gray-800/50 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-xl 
                     border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                     transition duration-200"
            type="search"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Pastes List */}
        <div className="space-y-6">
          {filteredData.length > 0 &&
            filteredData.map((paste) => (
              <div 
                key={paste?._id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden 
                         backdrop-blur-sm hover:border-gray-600 transition duration-200"
              >
                {/* Paste Header */}
                <div className="p-4 border-b border-gray-700 bg-gray-800/30">
                  <h2 className="text-xl font-semibold text-white">{paste.title}</h2>
                  <div className="flex items-center mt-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {paste.createdAt}
                  </div>
                </div>

                {/* Paste Content */}
                <div className="p-4 text-gray-300">
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {paste.content}
                  </pre>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 p-4 bg-gray-800/30 border-t border-gray-700">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    className="p-2 text-blue-400 hover:bg-gray-700/50 rounded-lg transition duration-200"
                    title="Edit"
                  >
                    <Pencil className="w-5 h-5" />
                  </a>
                  
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="p-2 text-red-400 hover:bg-gray-700/50 rounded-lg transition duration-200"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <a
                    href={`/pastes/${paste?._id}`}
                    className="p-2 text-green-400 hover:bg-gray-700/50 rounded-lg transition duration-200"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="p-2 text-yellow-400 hover:bg-gray-700/50 rounded-lg transition duration-200"
                    title="Copy"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() =>
                      navigator.share
                        ? navigator.share({
                            title: "Check this out!",
                            url: window.location.href,
                          })
                        : toast.error("Sharing not supported")
                    }
                    className="p-2 text-purple-400 hover:bg-gray-700/50 rounded-lg transition duration-200"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Paste;