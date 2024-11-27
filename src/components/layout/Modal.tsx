import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const Modal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div
      className={`fixed inset-0 z-10 flex h-fit transform justify-end transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={onClose}>
      <div className="mt-16 h-full w-64 space-y-4 bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => handleNavigate("/mypage")}
          className="block w-full px-4 py-2 text-left text-primary hover:bg-gray-100">
          MY PAGE
        </button>
        <button
          onClick={() => handleNavigate("/classroom/1")}
          className="block w-full px-4 py-2 text-left text-primary hover:bg-gray-100">
          MY CLASSROOM
        </button>
        <button onClick={handleLogout} className="block w-full px-4 py-2 text-left text-primary hover:bg-gray-100">
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default Modal;
