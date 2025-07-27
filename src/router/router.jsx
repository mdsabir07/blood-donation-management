import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import DonationRequest from "../pages/DonationRequest/DonationRequest";
import Blog from "../pages/Blog/Blog";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routes/PrivateRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import SearchDonors from "../pages/SearchDonors/SearchDonors";
import Profile from "../pages/Dashboard/Profile/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest/CreateDonationRequest";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'donation-requests',
                Component: DonationRequest
            },
            {
                path: 'blog',
                Component: Blog
            },
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'search-donors',
                Component: SearchDonors
            },
            {
                path: 'forbidden',
                Component: Forbidden
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'create-donation-request',
                Component: CreateDonationRequest
            }

        ]
    }

])