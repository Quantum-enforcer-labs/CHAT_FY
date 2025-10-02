import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { PageLoader } from "../../components/PageLoader";
import { useEffect, useState } from "react";
import { useSignup } from "../../hooks/userAuthLogic";
import { useAuthStore } from "../../store/useAuth";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate({ to: "/" });
    }
  }, [authUser, navigate, isCheckingAuth]);

  const { mutate, status, error } = useSignup();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.email.trim() === "" ||
      formData.fullName.trim() === "" ||
      formData.password.trim() === ""
    )
      return;
    mutate({ ...formData });
    setFormData({
      email: "",
      fullName: "",
      password: "",
    });
  };

  useEffect(() => {
    if (status === "success") {
      toast.success("Signup successful! Welcome aboard.");
    } else if (status === "error") {
      toast.error(error.message);
    }
  }, [status, error]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden">
        {/* Left Side */}
        <div className="p-10 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-cyan-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h6m-6 4h8m5-10v10a2 2 0 01-2 2H6l-4 4V6a2 2 0 012-2h14a2 2 0 012 2z"
                />
              </svg>
            </div>
            <h2 className="ml-3 text-2xl font-bold text-white">
              Create Account
            </h2>
          </div>
          <p className="text-gray-400 mb-8">Sign up for a new account</p>

          {/* Signup Form with Icons */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M12 12a5 5 0 100-10 5 5 0 000 10z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-10 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12H8m0 0l4-4m0 0l4 4M4 12v6a2 2 0 002 2h12a2 2 0 002-2v-6"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-10 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4zM4 12a8 8 0 0116 0c0 3.31-2.69 6-6 6H10c-3.31 0-6-2.69-6-6z"
                  />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-gray-600 bg-gray-900/70 px-10 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-cyan-400 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black p-10">
          <img
            src="/signup.png"
            alt="Chat Illustration"
            className="max-w-xs mb-6"
          />
          <h3 className="text-lg font-semibold text-white mb-2">
            Start Your Journey Today
          </h3>
          <div className="flex gap-3 text-sm text-gray-300">
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
              Free
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
              Easy Setup
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
              Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
