import { useFetchUserQuery } from "hooks/useLogin";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const { isError } = useFetchUserQuery();
  const location = useLocation();

  if (isError) {
    localStorage.removeItem("authToken");
    return <Navigate to={"/login"} />;
  }

  if (location.pathname === "/login") {
    if (!user || !localStorage.getItem("authToken")) return children;
    return <Navigate to="/" replace />;
  }

  if (!user || !localStorage.getItem("authToken")) {
    if (location.pathname === "/") return <Navigate to={"/login"} />;
    alert("로그인이 필요합니다.");
    return <Navigate to={"/login"} />;
  }
  return children;
};
export default ProtectedRoute;
