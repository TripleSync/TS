import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to={"/login"} />;
  }
  return children;
};
export default ProtectedRoute;
