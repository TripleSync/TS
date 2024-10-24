import BasicLayout from "layouts/BasicLayout";
import ClassRoom from "page/ClassRoom";
import Home from "page/Home";
import Login from "page/Login";
import SignUp from "page/SignUp";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "classroom",
        element: <ClassRoom />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
export default Router;
