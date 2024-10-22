import BasicLayout from "layouts/BasicLayout";
import ClassRoom from "page/ClassRoom";
import Home from "page/Home";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/classroom",
        element: <ClassRoom />,
      },
    ],
  },

  {
    path: "/login",
    element: "login",
  },
]);
export default Router;
