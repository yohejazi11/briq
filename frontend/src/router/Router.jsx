import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import ProjectsList from "../pages/ProjectsList";
import ProjectDetails from "../pages/ProjectDetails";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/home",
        element: <Home></Home>,
    },
    {
        path: "/dashboard",
        element: <AdminDashboard></AdminDashboard>,
    },
    {
        path: "/login",
        element: <Login></Login>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/projects",
        element: <ProjectsList />,
    },
    {
        path: "/project/:id",
        element: <ProjectDetails />,
    },


]);

function Router() {

    return <RouterProvider router={router} />;
}

export default Router