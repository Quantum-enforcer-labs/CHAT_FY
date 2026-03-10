import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuth";
import { PageLoader } from "../components/PageLoader";
import ProfileHeader from "../components/ProfileHeader";
import { useEffect } from "react";

import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import { useChatStore } from "../store/useChatStore";
import ConversationContainer from "../components/ConversationContainer";
import Placeholder from "../components/Placeholder";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const { activeTab, selectedUser } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      navigate({ to: "/auth/login" });
    }
  }, [isCheckingAuth, authUser, navigate]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <div className="relative w-full max-w-6xl h-[800px] flex bg-gray-900 rounded-xl overflow-hidden">
      {/* left sidebar */}
      <div className="w-1/3 bg-gray-800 border-r border-gray-700 flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>

      {/* right content */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {selectedUser ? <ConversationContainer /> : <Placeholder />}
      </div>
    </div>
  );
}
