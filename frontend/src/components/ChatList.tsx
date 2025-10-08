import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const ChatList = () => {
  const {
    getMyChatParteners,
    chats,
    isChatLoading,
    isUserLoading,
    setSelectedUser,
  } = useChatStore();

  useEffect(() => {
    getMyChatParteners();
  }, [getMyChatParteners]);

  if (isChatLoading || isUserLoading) return <UserLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="px-3 flex flex-col gap-1 divide-y divide-slate-800 bg-slate-900/40 backdrop-blur-md rounded-lg overflow-hidden">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setSelectedUser(chat)}
          className="flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-slate-800/70 active:scale-[0.98] rounded-md"
        >
          {/* Avatar */}
          <div className="relative">
            <img
              src={chat.avatarUrl || "/profile_pic.jpg"}
              alt={chat.fullName || "User"}
              className="w-10 h-10 rounded-full object-cover border border-slate-700 hover:border-cyan-400 transition-colors"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900"></span>
          </div>

          {/* Chat details */}
          <div className="flex-1 min-w-0">
            <h4 className="text-slate-200 font-medium text-sm truncate">
              {chat.fullName || "User"}
            </h4>
            {chat.lastMessage && (
              <p className="text-slate-400 text-xs truncate">
                {chat.lastMessage}
              </p>
            )}
          </div>

          {/* Timestamp */}
          {chat.lastMessageTime && (
            <span className="text-[10px] text-slate-500 whitespace-nowrap">
              {new Date(chat.lastMessageTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
