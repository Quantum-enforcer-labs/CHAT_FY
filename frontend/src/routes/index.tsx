import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store/useAuth";
import { PageLoader } from "../components/PageLoader";
import { useEffect } from "react";
import { useLogout } from "../hooks/userAuthLogic";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

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
      <button
        onClick={() => {
          logout();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
}
