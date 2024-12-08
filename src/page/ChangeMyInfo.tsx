import LoginButton from "@components/Login/LoginButton";
import LoginInput, { inputStyle } from "@components/Login/LoginInput";
import useInput from "hooks/useInput";
import { useUpdateProfile } from "hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const ChangeMyInfo = () => {
  const user = useUserStore((state) => state.user);
  const [name, onChangeName] = useInput(user?.name ?? "Name");
  const [phone, onChangePhone] = useInput(user?.phone ?? "Phone");
  const [profileUrl, onChangeProfileUrl] = useInput(user?.profileUrl ?? "No profile");
  const { mutate, isError, error } = useUpdateProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, phone, profileUrl });
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <img
          src={profileUrl}
          alt=""
          className="h-[150px] w-[150px] rounded-full bg-primary object-cover xl:h-[250px] xl:w-[250px]"
        />
      </div>
      <h2 className="my-3 text-center text-2xl font-bold">Change My Info</h2>
      {isError && <p className="text-center text-red-500">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <div className="w-1/2">
            <LoginInput label="Name" type="text" id="name" value={name} onChange={onChangeName} />
          </div>
        </div>
        <label htmlFor={"email"} className="mt-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <p id="email" className={inputStyle}>
          {user?.email ?? "Email"}
        </p>
        <LoginInput label="Phone Number" type="tel" id="phone" value={phone} onChange={onChangePhone} />
        <LoginInput
          label="Profile Image"
          type="text"
          id="profileImg"
          value={profileUrl}
          onChange={onChangeProfileUrl}
          required={false}
        />
        <div className="mt-8 flex justify-between">
          <LoginButton
            text="마이페이지"
            onClick={() => {
              if (window.confirm("마이페이지로 이동하시겠습니까?")) {
                navigate("/mypage");
              }
            }}
          />
          <LoginButton text="변경" type="submit" />
        </div>
      </form>
    </>
  );
};
export default ChangeMyInfo;
