import { motion } from "framer-motion";

function MessagesLoadingSkeleton() {
  return (
    <div className="relative max-w-3xl mx-auto space-y-6 px-4 py-6 overflow-hidden">
      {/* Soft background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 pointer-events-none" />

      {/* Animated shimmer layer */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,transparent,rgba(34,211,238,0.08),transparent)] animate-[shimmer_2.5s_infinite]" />

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
        `}
      </style>

      {[...Array(6)].map((_, index) => {
        const isOwn = index % 2 !== 0;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative rounded-2xl px-4 py-3 w-40 sm:w-56 md:w-64 h-12 
                          overflow-hidden backdrop-blur-md 
                          ${
                            isOwn
                              ? "bg-gradient-to-r from-cyan-700/40 to-cyan-800/30"
                              : "bg-gradient-to-r from-slate-800/60 to-slate-700/40"
                          }`}
            >
              {/* Glow shimmer pulse */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${
                  isOwn
                    ? "from-cyan-400/10 via-cyan-300/10 to-transparent"
                    : "from-slate-600/10 via-slate-500/10 to-transparent"
                } animate-[pulse_1.8s_ease-in-out_infinite]`}
              />
              <style>
                {`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                  }
                `}
              </style>

              {/* Simulated text bars */}
              <div className="space-y-2">
                <div className="w-3/4 h-2 rounded-full bg-slate-600/40" />
                <div className="w-1/2 h-2 rounded-full bg-slate-700/40" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default MessagesLoadingSkeleton;
