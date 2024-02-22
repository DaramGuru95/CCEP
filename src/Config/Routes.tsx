import { Navigate, createBrowserRouter } from "react-router-dom";
// import Layout from "../Pages/Layout";
import Home from "../Pages/Home";
import ErrorLayout from "../Common/ErrorLayout";
// import AgentConsole from "../Pages/Agent";
import Tickets from "../Pages/Tickets";
// import Error from "../Common/ErrorLayout/Error";
// import Root from "../Common/Root";
import Layout from "../Common/Layout";
import Dashboard from "../Pages/Dashboard";
import QandA from "../Pages/Q&A";
import Archives from "../Pages/Archives";
import Settings from "../Pages/Settings";
import ViewLogs from "../Pages/Logs";
import AgentChatConsole from "../Pages/AgentChat";
import { AuthLayout } from "../Pages/auth/Layout";
import Login from "../Pages/auth/Login";
import DetailedTicketPage from "../Pages/Tickets/Components/DetailedTicketPage";
import TicketMoreInformation from "../Pages/Tickets/Components/TicketHistoryInformation/TicketMoreInformation";
import { useSelector } from "react-redux";
import { RootState } from "./Store";

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.appState.isAuthenticated
  );

  // console.log(isAuthenticated, "isAuthenticated");

  return isAuthenticated ? element : <Navigate to={"/auth/login"} />;
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PrivateRoute element={<Layout />} />,
      errorElement: <ErrorLayout />,
      children: [
        {
          path: "/home",
          element: <PrivateRoute element={<Home />} />,
          index: true,
        },

        {
          path: "agent-console",
          element: <PrivateRoute element={<AgentChatConsole />} />,
        },

        {
          path: "tickets",
          element: <PrivateRoute element={<Tickets />} />,
        },
        {
          path: "tickets/:ticketId",
          element: <PrivateRoute element={<DetailedTicketPage />} />,
        },
        {
          path: "tickets/:tickedId/info/:contact",
          element: <PrivateRoute element={<TicketMoreInformation />} />,
        },

        {
          path: "dashboard",
          element: <PrivateRoute element={<Dashboard />} />,
        },
        {
          path: "QandA",
          element: <PrivateRoute element={<QandA />} />,
        },
        {
          path: "archive",
          element: <PrivateRoute element={<Archives />} />,
        },
        {
          path: "settings",
          element: <PrivateRoute element={<Settings />} />,
        },
        {
          path: "logs",
          element: <PrivateRoute element={<ViewLogs />} />,
        },
      ],
    },
    {
      path: "auth/",
      element: <AuthLayout />,
      errorElement: <ErrorLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ],
  { basename: "/ccep" }
);

export default router;
