import BasicLayout from "layouts/BasicLayout";
import ClassRoom from "page/ClassRoom";
import Home from "page/Home";
import Login from "page/Login";
import SignUp from "page/SignUp";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/classroom/:roomId",
        element: (
          <ProtectedRoute>
            <ClassRoom />
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
export default Router;
