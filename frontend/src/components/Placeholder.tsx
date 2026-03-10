import { motion } from "motion/react";
import { MessageCircleIcon } from "lucide-react";

const Placeholder = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Full coverage glowing background */}
      <div className="absolute inset-0">
        {/* Layered glow gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-transparent opacity-70 blur-[120px]" />
        <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay blur-[180px]" />
      </div>

      {/* Floating energy particle */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-cyan-500/25 rounded-full blur-[180px] mix-blend-screen pointer-events-none"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 30, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content container */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center p-10 max-w-lg w-full mx-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Icon container */}
        <motion.div
          className="size-24 bg-gradient-to-br from-cyan-500/50 to-purple-600/40 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/40"
          whileHover={{ scale: 1.1, rotate: 6 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <MessageCircleIcon className="size-12 text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" />
        </motion.div>

        {/* Text content */}
        <h3 className="text-3xl font-semibold text-white mb-3 tracking-tight">
          Select a conversation
        </h3>

        <p className="text-slate-400 text-lg leading-relaxed max-w-md">
          Choose a contact from the sidebar to start chatting or continue where
          you left off.
        </p>
      </motion.div>
    </div>
  );
};

export default Placeholder;
