import LogoArea from "@components/layout/LogoArea";
import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div className="mx-auto flex h-full overflow-hidden rounded-lg">
      <LogoArea />
      <div className="flex w-1/2 items-center justify-center bg-gray-100">
        <div className="w-full p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default BasicLayout;
