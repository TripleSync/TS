import VideoChatCopy from "@components/VideoChat/VideoChat";
import BasicLayout from "layouts/BasicLayout";
import ClassRoom from "page/ClassRoom";
import Home from "page/Home";
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
      {
        path: "/classroom/:roomId",
        element: <VideoChatCopy />,
      },
    ],
  },

  {
    path: "/login",
    element: "login",
  },
]);
export default Router;
