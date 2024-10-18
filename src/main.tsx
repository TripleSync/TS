import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ClassRoom from "./page/ClassRoom";
import "./styles/tailwind.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClassRoom />
    </QueryClientProvider>
  </StrictMode>
);
