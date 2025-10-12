import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuth";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = selectedUser?._id
    ? onlineUsers.includes(selectedUser._id)
    : false;

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
        {/* Avatar + Status */}
        <div className="relative">
          {/* Outer glow if online */}
          {isOnline && (
            <div className="absolute inset-0 rounded-full bg-green-400 blur-sm opacity-70 animate-pulse" />
          )}
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-slate-700 shadow-inner">
            <img
              src={selectedUser?.avatarUrl || "/profile_pic.jpg"}
              alt={selectedUser?.fullName || "User"}
              className="object-cover w-full h-full"
            />

            {/* Status dot */}
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-[2px] border-slate-800 transition-all duration-300 ${
                isOnline
                  ? "bg-green-400 shadow-[0_0_10px_#22c55e]"
                  : "bg-gray-500"
              }`}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="min-w-0">
          <h4 className="text-slate-100 font-semibold text-base truncate">
            {selectedUser?.fullName || "User"}
          </h4>
          <p
            className={`text-xs ${
              isOnline ? "text-green-400" : "text-slate-400"
            } transition-colors duration-300`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
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
