import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    if (location.pathname === "/") return <Navigate to={"/login"} />;
    alert("로그인이 필요합니다.");
    return <Navigate to={"/login"} />;
  }
  return children;
};
export default ProtectedRoute;
