import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="min-h-screen bg-gradient-to-tr from-slate-900 via-gray-800 to-black relative flex flex-col items-center justify-center p-6 overflow-hidden">
    {/* Neon Grid Lines */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]" />

    {/* Dynamic Neon Shapes */}
    <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-pink-500 opacity-20 blur-[100px] animate-neon" />
    <div className="absolute bottom-10 right-1/3 w-96 h-96 rounded-full bg-cyan-400 opacity-25 blur-[120px] animate-neon animation-delay-3000" />
    <div className="absolute top-1/2 left-3/4 w-60 h-60 rounded-full bg-purple-500 opacity-15 blur-[80px] animate-neon animation-delay-5000" />

    {/* Angular Light Beams */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-30 animate-beam" />
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-pink-400 to-transparent left-1/3 opacity-25 animate-beam animation-delay-2000" />
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent left-2/3 opacity-20 animate-beam animation-delay-4000" />
    </div>

    {/* Glassy Content Panel */}
    <div className="relative z-10 w-full max-w-3xl p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-lg">
      <Outlet />
    </div>

    <TanStackRouterDevtools />
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
