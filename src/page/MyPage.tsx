import Button from "@components/common/Button";
import LoginInput from "@components/Login/LoginInput";
import useInput from "hooks/useInput";
import { useUpdateProfile } from "hooks/useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const MyPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const [name, onChangeName] = useInput(user?.name ?? "Name");
  const [phone, onChangePhone] = useInput(user?.phone ?? "Phone");
  const [profileUrl, onChangeProfileUrl] = useInput(user?.profileUrl ?? "No profile");
  const [isChange, setIsChange] = useState(false);
  const { mutate, isError, error } = useUpdateProfile();

  return (
    <div className="flex h-full flex-col justify-center gap-7">
      <h2 className="my-3 text-center text-2xl font-bold">My Page</h2>
      {isError && error && <p className="text-center text-red-500">{error.message}</p>}
      <form action="">
        <div className="flex items-center">
          <div className="w-1/2">
            <LoginInput label="Name" disabled={!isChange} type="text" id="name" value={name} onChange={onChangeName} />
          </div>
        </div>
        <LoginInput label="Email" type="email" id="email" disabled={true} value={user?.email ?? "Email"} />
        <LoginInput label="Study Time" type="text" id="time" disabled={true} value={"00:00:00"} />
        <LoginInput
          label="Phone Number"
          disabled={!isChange}
          type="tel"
          id="phone"
          value={phone}
          onChange={onChangePhone}
        />
        <LoginInput
          label="Profile Image"
          disabled={!isChange}
          type="text"
          id="profileImg"
          value={profileUrl}
          onChange={onChangeProfileUrl}
          required={false}
        />
        {isChange ? (
          <div className="mt-5 flex justify-between">
            <Button
              text={"취소"}
              onClick={() => {
                onChangeName({ target: { value: user?.name ?? "Name" } } as React.ChangeEvent<HTMLInputElement>);
                onChangePhone({ target: { value: user?.phone ?? "Phone" } } as React.ChangeEvent<HTMLInputElement>);
                onChangeProfileUrl({
                  target: { value: user?.profileUrl ?? "No profile" },
                } as React.ChangeEvent<HTMLInputElement>);
                setIsChange((isChange) => !isChange);
              }}
            />
            <Button text="변경" onClick={() => mutate({ name, phone, profileUrl })} />
          </div>
        ) : (
          <div className="mt-5 flex justify-between">
            <Button
              text={"홈"}
              onClick={() => {
                navigate("/");
              }}
            />
            <Button text="내 정보 수정" onClick={() => setIsChange((isChange) => !isChange)} />
          </div>
        )}
      </form>
    </div>
  );
};
export default MyPage;
