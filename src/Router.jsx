import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import MyCart from "./pages/MyCart";
import PrivateRouteAlt from "./pages/PrivateRouteAlt";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import Register from "./pages/Register";
import BrandProducts from "./pages/BrandProducts";
import ProductDetails from "./pages/ProductDetails";
import UpdateProduct from "./pages/UpdateProduct";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/add',
        element: <PrivateRoute><AddProduct /></PrivateRoute>
      },
      {
        path: '/cart',
        element: <PrivateRoute><MyCart /></PrivateRoute>
      },
      {
        path: '/login',
        element: <PrivateRouteAlt><Login /></PrivateRouteAlt>
      },
      {
        path: '/register',
        element: <PrivateRouteAlt><Register /></PrivateRouteAlt>
      },
      {
        path: '/products/categories/:category',
        element: <BrandProducts />
      },
      {
        path: '/products/:slug',
        element: <PrivateRoute><ProductDetails /></PrivateRoute>
      },
      {
        path: '/update/:slug',
        element: <PrivateRoute><UpdateProduct /></PrivateRoute>
      }
    ]
  }
])