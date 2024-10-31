import LoginButton from "@components/Login/LoginButton";
import LoginInput from "@components/Login/LoginInput";
import LogoArea from "@components/Login/LogoArea";
import { fbAuth, fbStore } from "config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import useInput from "hooks/useInput";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, onChangeName] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [phone, onChangePhone] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(fbAuth, email, password);
      const user = userCredential.user;

      await setDoc(doc(fbStore, "users", user.uid), {
        name: name,
        email: email,
        phone: phone,
        nickname: nickname,
        createdAt: new Date(),
      });
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex h-full overflow-hidden rounded-lg">
      <LogoArea />
      <div className="flex w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full p-8">
          <h2 className="mb-6 text-center text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <LoginInput label="Name" type="text" id="name" value={name} onChange={onChangeName} />
            <LoginInput label="Email" type="email" id="email" value={email} onChange={onChangeEmail} />
            <LoginInput label="Password" type="password" id="password" value={password} onChange={onChangePassword} />
            <LoginInput label="Phone Number" type="tel" id="phone" value={phone} onChange={onChangePhone} />
            <LoginInput label="Nickname" type="text" id="nickname" value={nickname} onChange={onChangeNickname} />
            <div className="mt-8 flex justify-between">
              <LoginButton text="Go to Login" onClick={() => navigate("/login")} />
              <LoginButton text="OK" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
