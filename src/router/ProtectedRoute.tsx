import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();

  // 앱 초기화 시 저장된 사용자 상태 로드
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (location.pathname === "/login") {
    console.log(localStorage.getItem("user"));
    if (!user && !localStorage.getItem("user")) return children;
    return <Navigate to="/" replace />;
  }

  if (!user && !localStorage.getItem("user")) {
    if (location.pathname === "/") return <Navigate to={"/login"} />;
    alert("로그인이 필요합니다.");
    return <Navigate to={"/login"} />;
  }
  return children;
};
export default ProtectedRoute;
