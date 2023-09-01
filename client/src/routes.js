import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import SignupPage from "./pages/SignupPage";
import useLogin from "./hooks/useLogin";
import { useStateContext } from "./Context/stateContext";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export default function Router() {
  const { setUser, user } = useStateContext();
  const { loading, data, meHandler } = useLogin();

  useEffect(() => {
    try {
      meHandler();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const routes = useRoutes([
    {
      path: "login",
      element: !user ? <LoginPage /> : <DashboardLayout />,
      index: true,
    },
    {
      path: "/dashboard",
      element: user ? <DashboardLayout /> : <LoginPage />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
      ],
    },
    {
      path: "signup",
      element: !user ? <SignupPage /> : <DashboardLayout />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
