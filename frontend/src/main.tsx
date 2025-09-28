import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create the TanStack Router instance
const router = createRouter({ routeTree });

// TypeScript augmentation (ideally in a separate file like `router.d.ts`)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Create a React Query client with sensible defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute

      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Get the root DOM element safely
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </QueryClientProvider>
);
