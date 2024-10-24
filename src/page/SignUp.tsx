import LoginButton from "@components/Login/LoginButton";
import LoginInput from "@components/Login/LoginInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/whitelogo.png";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nickname, setNickname] = useState("");
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
          <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <LoginInput label="Name" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
            <LoginInput
              label="Phone Number"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <LoginInput
              label="Nickname"
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="mt-8 flex justify-between">
              <LoginButton text="Sign Up" type="submit" />
              <LoginButton text="Go to Login" onClick={() => navigate("/login")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
