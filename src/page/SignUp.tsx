import LoginButton from "@components/Login/LoginButton";
import LoginInput from "@components/Login/LoginInput";
import useInput from "hooks/useInput";
import { useSignUp } from "hooks/useLogin";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [phone, onChangePhone] = useInput("");
  const [role, onChangeRole] = useInput("0");
  const [profileUrl, onChangeProfileUrl] = useInput("");
  const { mutate, isError, error } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email, password, phone, role, profileUrl });
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
      <h2 className="my-3 text-center text-2xl font-bold">Sign Up</h2>
      {isError && <p className="text-center text-red-500">{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <LoginInput label="Name" type="text" id="name" value={name} onChange={onChangeName} />
        <LoginInput label="Email" type="email" id="email" value={email} onChange={onChangeEmail} />
        <LoginInput label="Password" type="password" id="password" value={password} onChange={onChangePassword} />
        <LoginInput label="Phone Number" type="tel" id="phone" value={phone} onChange={onChangePhone} />
        <LoginInput label="Nickname" type="text" id="nickname" value={nickname} onChange={onChangeNickname} />
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
            text="Go to Login"
            onClick={() => {
              if (window.confirm("로그인 페이지로 이동하시겠습니까?")) {
                navigate("/login");
              }
            }}
          />
          <LoginButton text="OK" type="submit" />
        </div>
      </form>
    </>
  );
};

export default SignUp;
