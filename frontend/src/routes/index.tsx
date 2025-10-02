import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuth";
import { PageLoader } from "../components/PageLoader";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

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
    <div>
      {authUser && (
        <h1 className="bg-amber-600">Welcome back, {authUser.email}!</h1>
      )}
    </div>
  );
}
