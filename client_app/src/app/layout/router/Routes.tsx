import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./RequireAuth";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import TrainingDashboard from "../../features/trainings/dashboard/TrainingDashboard";
import TrainingDetails from "../../features/trainings/details/TrainingDetails";
import TrainingForm from "../../features/trainings/form/TrainingForm";
import ProfilePage from "../../pages/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage";
import ConfirmEmailPage from "../../pages/ConfirmEmailPage";
import RegistrationSuccess from "../../features/users/RegistrationSuccess";

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

      { path: "not-found", element: <NotFoundPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "account/RegistrationSuccess", element: <RegistrationSuccess /> },
      { path: "account/verifyEmail", element: <ConfirmEmailPage /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
