import { useEffect } from "react";
import { useAuthStore } from "../store/useAuth";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import { motion } from "framer-motion";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

const ConversationContainer = () => {
  const { getMessagesByUserId, selectedUser, messages, isMessageLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser) getMessagesByUserId(selectedUser?.id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <div className="relative flex flex-col h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.06),transparent_70%)] pointer-events-none" />

      {/* Chat Header */}
      <ChatHeader />

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {messages.length > 0 && !isMessageLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, index) => {
              const isOwn = msg.senderId === authUser?.id;
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`relative px-4 py-3 rounded-2xl text-sm max-w-[75%] backdrop-blur-md 
                    ${
                      isOwn
                        ? "bg-gradient-to-br from-cyan-600/80 to-cyan-700/60 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "bg-slate-800/60 border border-slate-700/40 text-slate-200 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    {/* Image message */}
                    {msg.image && (
                      <motion.img
                        src={msg.image}
                        alt="Shared"
                        className="rounded-xl mb-2 max-h-60 w-full object-cover border border-slate-700/40"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Text message */}
                    {msg.content && (
                      <p className="whitespace-pre-wrap leading-relaxed break-words">
                        {msg.content}
                      </p>
                    )}

                    {/* Timestamp */}
                    {msg.timestamp && (
                      <span
                        className={`absolute text-[0.65rem] bottom-1.5 ${
                          isOwn
                            ? "right-3 text-cyan-200/60"
                            : "right-3 text-slate-400/60"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : isMessageLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName ?? "user"} />
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-slate-800/70 bg-slate-900/60 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <MessageInput />
      </div>
    </div>
  );
};

export default ConversationContainer;
