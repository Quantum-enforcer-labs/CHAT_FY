import { motion } from "framer-motion";
import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }: { name: string }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Ambient background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-slate-900/40 to-purple-700/10 blur-3xl pointer-events-none" />

      {/* Floating background blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25, y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Centered content wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center text-center p-8"
      >
        {/* Icon container */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
                     rounded-2xl flex items-center justify-center 
                     ring-1 ring-slate-700/50 backdrop-blur-md shadow-lg"
        >
          <MessageCircleIcon className="size-9 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-100 mb-3">
          Start your conversation with{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h3>

        {/* Subtext */}
        <div className="flex flex-col space-y-3 max-w-md mb-6">
          <p className="text-slate-400 text-sm leading-relaxed">
            This is the beginning of your conversation. Break the ice with a
            friendly message!
          </p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mx-auto" />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?"].map(
            (text, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 text-sm font-medium 
                         bg-gradient-to-r from-cyan-500/10 to-purple-500/10 
                         text-cyan-400 rounded-full border border-cyan-500/20 
                         hover:from-cyan-500/20 hover:to-purple-500/20 
                         hover:text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]
                         transition-all duration-300"
              >
                {text}
              </motion.button>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;
