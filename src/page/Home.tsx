import Button from "@components/common/Button";
import ProfilePhoto from "@components/common/ProfilePhoto";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col justify-center gap-7">
      <div id="profile" className="flex flex-col">
        <ProfilePhoto />
        <h1 className={inputStyle}>Name</h1>
        <p className={inputStyle}>email</p>
        <p className={inputStyle}>00:00:00</p>
      </div>
      <div className="mt-5 flex justify-between">
        <Button text="마이페이지" />
        <Button
          text="강의실 입장"
          onClick={() => {
            navigate("/classroom/1");
          }}
        />
      </div>
    </div>
  );
};
export default Home;
