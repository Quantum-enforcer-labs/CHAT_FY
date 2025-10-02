import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-gray-900 via-black to-gray-950 text-white">
    {/* Subtle Starfield / Dots */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:24px_24px] opacity-20" />

    {/* Glow Orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[150px] animate-pulse" />
    <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/20 blur-[180px] animate-pulse animation-delay-2000" />
    <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse animation-delay-4000" />

    {/* Vertical Neon Lines */}
    <div className="absolute inset-0 flex justify-between px-20 opacity-20">
      <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-beam" />
      <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent animate-beam animation-delay-2000" />
      <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-beam animation-delay-4000" />
    </div>

    {/* Overlay Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

    {/* Chat Content */}
    <div className="relative z-10 w-full max-w-5xl p-6">
      <Outlet />
    </div>

    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
