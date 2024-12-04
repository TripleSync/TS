import BasicLayout from "layouts/BasicLayout";
import RoomLayout from "layouts/RoomLayout";
import ClassRoom from "page/ClassRoom";
import Home from "page/Home";
import Login from "page/Login";
import SignUp from "page/SignUp";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <BasicLayout />
      </ProtectedRoute>
    ),
    path: "/",
    children: [
      {
        index: true,
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <RoomLayout />
      </ProtectedRoute>
    ),
    path: "/classroom",
    children: [
      {
        path: ":roomId",
        element: (
          <>
            <ClassRoom />
          </>
        ),
      },
    ],
  },
]);
export default Router;
