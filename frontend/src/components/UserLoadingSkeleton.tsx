import { motion } from "motion/react";

function UserLoadingSkeleton() {
  return (
    <div className="space-y-4 px-4">
      {[1, 2, 3, 4].map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className="relative overflow-hidden bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-md"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full animate-pulse bg-gradient-to-r from-transparent via-gray-600/30 to-transparent rounded-xl" />

          <div className="flex items-center space-x-3 relative z-10">
            {/* Avatar */}
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />

            {/* User info */}
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-2.5 bg-gray-600 rounded w-1/2 animate-pulse" />
            </div>

            {/* Status dot */}
            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default UserLoadingSkeleton;
