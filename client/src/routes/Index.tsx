import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import Layout from "../layouts/Layout";
import Management from "../pages/Management";
import Detail from "../pages/Detailpage";
import ProtectedRoute from "../components/ProtectedRoute";
export default function Index() {
  const router = createBrowserRouter([
    { path: "/login", element: <Loginpage /> },
    { path: "/register", element: <Registerpage /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Management /> },
        { path: "/detail", element: <Detail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
