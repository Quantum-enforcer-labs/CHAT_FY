import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { motion } from "motion/react";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">
      {/* Animated Icon */}
      <motion.div
        className="w-20 h-20 bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 rounded-full flex items-center justify-center shadow-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <MessageCircleIcon className="w-10 h-10 text-cyan-400 animate-pulse" />
      </motion.div>

      {/* Message */}
      <div>
        <h4 className="text-slate-100 font-semibold text-lg md:text-xl mb-2">
          No conversations yet
        </h4>
        <p className="text-slate-400 text-sm md:text-base px-6 md:px-0">
          Start a new chat by selecting a contact from the contacts tab or
          invite a friend to get started!
        </p>
      </div>

      {/* Button with hover & bounce effect */}
      <motion.button
        onClick={() => setActiveTab("contacts")}
        whileHover={{ scale: 1.05, backgroundColor: "rgba(14, 165, 233, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 text-sm md:text-base font-medium text-cyan-400 bg-cyan-500/20 rounded-xl shadow-md shadow-cyan-500/30 hover:shadow-cyan-400/50 transition-all duration-300"
      >
        Find contacts
      </motion.button>

      {/* Optional sparkles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div
          className="w-1 h-1 bg-cyan-400 rounded-full animate-ping absolute"
          style={{ top: "10%", left: "20%" }}
        />
        <div
          className="w-1 h-1 bg-cyan-400 rounded-full animate-ping absolute"
          style={{ top: "40%", left: "80%" }}
        />
      </div>
    </div>
  );
}

export default NoChatsFound;
