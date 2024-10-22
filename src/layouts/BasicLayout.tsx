import { Outlet } from "react-router-dom";

const BasicLayout = () => {
  return (
    <>
      <h1>BasicLayout Component</h1>
      <Outlet />
    </>
  );
};
export default BasicLayout;
