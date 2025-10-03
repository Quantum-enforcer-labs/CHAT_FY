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

  console.log({ authUser, isCheckingAuth });

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      {/* left side */}
      <div>
        <ProfileHeader />
        <ActiveTabSwitch />

        <div>{activeTab === "chats" ? <ChatList /> : <ContactList />}</div>
      </div>

      {/* right side */}

      <div>{selectedUser ? <ConversationContainer /> : <Placeholder />}</div>
    </div>
  );
}
