import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])