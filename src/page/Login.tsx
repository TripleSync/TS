import LoginButton from "@components/Login/LoginButton";
import LoginInput from "@components/Login/LoginInput";
import LogoArea from "@components/Login/LogoArea";
import useInput from "hooks/useInput";
import { useLogin } from "hooks/useLogin";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const navigate = useNavigate();

  const { mutate, isError, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="mx-auto flex h-full overflow-hidden rounded-lg">
      <LogoArea />
      <div className="flex w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full p-8">
          <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
          {isError && <p className="text-center text-red-500">{error.message}</p>}
          <form onSubmit={handleSubmit}>
            <LoginInput label="Email" type="email" id="email" value={email} onChange={onChangeEmail} />
            <LoginInput label="Password" type="password" id="password" value={password} onChange={onChangePassword} />
            <div className="mt-8 flex justify-between">
              <LoginButton
                text="Go to Sign Up"
                onClick={() => {
                  if (window.confirm("회원가입 페이지로 이동하시겠습니까?")) {
                    navigate("/signup");
                  }
                }}
              />
              <LoginButton text="OK" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
