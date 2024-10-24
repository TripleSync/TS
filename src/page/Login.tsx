import LoginButton from "@components/Login/LoginButton";
import LoginInput from "@components/Login/LoginInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/whitelogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto flex h-full overflow-hidden rounded-lg">
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-1/2 rounded-full bg-secondary">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full p-8">
          <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <LoginInput
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInput
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-8 flex justify-between">
              <LoginButton text="Login" type="submit" />
              <LoginButton text="Go to Sign Up" onClick={() => navigate("/signup")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
