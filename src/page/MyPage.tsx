import Button from "@components/common/Button";
import { inputStyle } from "@components/Login/LoginInput";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const MyPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const profileUrl = user?.profileUrl && user.profileUrl.length > 0 ? user.profileUrl : "No profile";

  return (
    <div className="flex h-full flex-col justify-center gap-7">
      <h2 className="my-3 text-center text-2xl font-bold">My Page</h2>
      <div id="profile" className="flex flex-col">
        <p id="name" className={inputStyle}>
          {user?.name ?? "Name"}
        </p>
        <p className={inputStyle}>{user?.email ?? "Email"}</p>
        <p className={inputStyle}>00:00:00</p>
        <p className={inputStyle}>{user?.phone ?? "Phone"}</p>
        <p className={inputStyle}>{profileUrl}</p>
      </div>
      <div className="mt-5 flex justify-between">
        <Button
          text="홈"
          onClick={() => {
            navigate("/");
          }}
        />
        <Button text="내 정보 수정" />
      </div>
    </div>
  );
};
export default MyPage;
