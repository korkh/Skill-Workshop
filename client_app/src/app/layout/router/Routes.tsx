import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "trainings", element: <TrainingDashboard /> },
          { path: "trainings/:id", element: <TrainingDetails /> },
          { path: "createTraining", element: <TrainingForm key="create" /> },
          { path: "manage/:id", element: <TrainingForm key="manage" /> },
          { path: "profiles/:username", element: <ProfilePage /> },
          { path: "errors", element: <TestErrors /> },
        ],
      },

      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "account/RegisterSuccess", element: <RegisterSuccess /> },
      { path: "account/verifyEmail", element: <ConfirmEmail /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
