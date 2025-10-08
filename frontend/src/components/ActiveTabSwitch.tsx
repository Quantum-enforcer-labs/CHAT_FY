import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex items-center bg-slate-800/40 rounded-xl p-1 mx-2 my-3 w-fit">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400 hover:text-slate-200"
        }`}
        onClick={() => setActiveTab("chats")}
      >
        Chats
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400 hover:text-slate-200"
        }`}
        onClick={() => setActiveTab("contacts")}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
