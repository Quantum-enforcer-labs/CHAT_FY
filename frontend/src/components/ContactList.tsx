import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import { useAuthStore } from "../store/useAuth";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUserLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) return <UserLoadingSkeleton />;

  return (
    <div className="px-3 flex flex-col gap-1 divide-y divide-slate-800 bg-slate-900/40 backdrop-blur-md rounded-lg overflow-hidden">
      {allContacts.map((contact) => {
        // Always ensure `contact.id` is unique and stable
        return (
          <div
            key={contact._id} // ✅ Correct placement
            onClick={() => setSelectedUser(contact)}
            className="flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 hover:bg-slate-800/70 active:scale-[0.98] rounded-md"
          >
            <div className="relative">
              <img
                src={contact.avatarUrl || "/profile_pic.jpg"}
                alt={contact.fullName || "User"}
                className="w-10 h-10 rounded-full object-cover border border-slate-700 hover:border-cyan-400 transition-colors"
              />
              <span
                className={`${onlineUsers.includes(contact._id) ? "avatar-online" : "avatar-offline"} `}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-slate-200 font-medium text-sm truncate">
                {contact.fullName || "User"}
              </h4>
              {contact.lastMessage && (
                <p className="text-slate-400 text-xs truncate">
                  {contact.lastMessage}
                </p>
              )}
            </div>

            {contact.lastMessageTime && (
              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                {new Date(contact.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
