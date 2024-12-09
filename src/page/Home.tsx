import Button from "@components/common/Button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";
const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col justify-center gap-7">
      <h2 className="my-3 text-center text-2xl font-bold"> {`Welcome ${user?.name ?? "Home"}!`}</h2>

      <div className="flex flex-col items-center justify-center gap-5">
        <Button
          text="강의실 입장"
          onClick={() => {
            navigate("/classroom/1");
          }}
        />
        <Button
          text="마이페이지"
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <Button text="로그아웃" onClick={handleLogout} />
      </div>
    </div>
  );
};
export default Home;
