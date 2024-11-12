import { useMutation } from "@tanstack/react-query";
import { fbAuth, fbStore } from "config/firebase";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(fbAuth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem("authToken", token);
    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(formatFirebaseError(error.code));
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

// 유저 정보 저장
const fetchUser = async () => {
  const user = fbAuth.currentUser;
  if (user) {
    const userDocRef = doc(fbStore, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData;
    }
  }
};

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => loginUser(data.email, data.password),
    onSuccess: async () => {
      const userData = await fetchUser();
      userData &&
        setUser({
          userName: userData.name,
          email: userData.email,
          phone: userData.phone,
          nickname: userData.nickname,
          createdAt: userData.createdAt,
          profileUrl: userData.profileUrl,
        });
      alert("로그인 성공");
      navigate("/");
    },
  });
};

const signUpUser = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  nickname: string,
  profileUrl: string | null
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(fbAuth, email, password);
    const user = userCredential.user;
    if (user) await sendEmailVerification(user);

    await setDoc(doc(fbStore, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      nickname: nickname,
      createdAt: new Date(),
      profileUrl: profileUrl,
    });

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      throw new Error(formatFirebaseError(error.code));
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      phone: string;
      nickname: string;
      profileUrl: string | null;
    }) => signUpUser(data.name, data.email, data.password, data.phone, data.nickname, data.profileUrl),
    onSuccess: () => {
      alert("회원가입 성공!");
      navigate("/login");
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const formatFirebaseError = (errocode: string) => {
  let errorMessage;
  switch (errocode) {
    case "auth/invalid-email":
      errorMessage = "잘못된 이메일 형식입니다.";
      break;
    case "auth/user-disabled":
      errorMessage = "이 사용자는 비활성화되었습니다.";
      break;
    case "auth/user-not-found":
      errorMessage = "해당 이메일 주소로 등록된 사용자가 없습니다.";
      break;
    case "auth/wrong-password":
      errorMessage = "잘못된 비밀번호입니다.";
      break;
    case "auth/invalid-credential":
      errorMessage = "유효하지 않은 인증 정보입니다. 다시 시도해 주세요.";
      break;
    case "auth/email-already-in-use":
      errorMessage = "해당 이메일 주소는 이미 사용 중입니다.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "해당 인증 방법이 비활성화되어 있습니다.";
      break;
    case "auth/weak-password":
      errorMessage = "비밀번호가 너무 약합니다. 최소 6자 이상 입력하세요.";
      break;
    default:
      errorMessage = "알 수 없는 오류가 발생했습니다.";
  }
  return errorMessage;
};
