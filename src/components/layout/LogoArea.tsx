import logo from "@assets/colorlogo.png";
import { useLocation } from "react-router-dom";
import { useUserStore } from "store/actions/useUserStore";

const LogoArea = () => {
  const profileUrl = useUserStore((state) => state.user?.profileUrl);
  const location = useLocation();

  let imgSrc = logo;
  if (location.pathname === "/mypage" && profileUrl && profileUrl?.length > 0) {
    imgSrc = profileUrl;
  }

  return (
    <>
      <div className="flex w-1/2 items-center justify-center">
        <img src={imgSrc} alt="logo" />
      </div>
    </>
  );
};
export default LogoArea;
