import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'category',
                element: <Category />
            }
        ]
    },
    {
        path: '/login',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <LoginPage />
            }
        ]
    },
]);

export default router;