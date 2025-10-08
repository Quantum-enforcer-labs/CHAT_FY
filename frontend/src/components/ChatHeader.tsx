import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "motion/react";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedUser(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setSelectedUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative flex justify-between items-center 
                 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
                 border-b border-slate-700/50 
                 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)]
                 px-6 py-4 rounded-t-2xl"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Avatar Glow */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 blur-sm opacity-60 animate-pulse" />
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700 shadow-inner">
            <img
              src={selectedUser?.avatarUrl || "/profile_pic.jpg"}
              alt={selectedUser?.fullName || "User"}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h4 className="text-slate-100 font-semibold text-base truncate">
            {selectedUser?.fullName || "User"}
          </h4>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setSelectedUser(null)}
        className="flex items-center justify-center p-2 rounded-full
                   bg-slate-700/40 hover:bg-slate-600/40 
                   text-slate-300 hover:text-white 
                   transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default ChatHeader;
