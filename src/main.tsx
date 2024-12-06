import "@styles/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchUserQuery } from "hooks/useLogin";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "router/Router";

const queryClient = new QueryClient();

const App = () => {
  const { isError, isLoading } = useFetchUserQuery();

  if (isLoading) {
    return <div></div>;
  }
  if (isError) {
    localStorage.removeItem("authToken");
  }
  return <RouterProvider router={Router} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
