import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../../store/useAuth";
import { PageLoader } from "../../components/PageLoader";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authUser) {
      navigate({ to: "/" });
    }
  }, [authUser, navigate, isCheckingAuth]);

  if (isCheckingAuth) return <PageLoader />;
  return <div>Login Page - Work in Progress</div>;
}
