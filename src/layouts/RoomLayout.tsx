import Nav from "@components/layout/Nav";
import { Outlet } from "react-router-dom";

const RoomLayout = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Nav />
      <main className="flex flex-1 py-5">
        <Outlet />
      </main>
    </div>
  );
};
export default RoomLayout;
