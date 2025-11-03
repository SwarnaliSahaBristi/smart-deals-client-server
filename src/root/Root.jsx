import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AllProducts from "../components/AllProducts";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import MyProducts from "../pages/MyProducts";
import MyBids from "../pages/MyBids";
import PrivateRoute from "../privateRoute/PrivateRoute";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
            path: '/allproducts',
            Component: AllProducts,
        },
        {
            path: '/login',
            element:<LogIn></LogIn>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/myProducts',
            element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
        },
        {
            path: '/myBids',
            element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
        }
    ]
  },
]);
