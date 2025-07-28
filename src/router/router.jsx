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
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests/MyDonationRequests";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AllDonationRequests from "../pages/Dashboard/AllDonationRequests/AllDonationRequests";
import ContentManagement from "../pages/Dashboard/Blogs/ContentManagement/ContentManagement";
import AddBlog from "../pages/Dashboard/Blogs/AddBlog/AddBlog";
import EditBlog from "../pages/Dashboard/Blogs/EditBlog/EditBlog";
import AdminOrVolunteerRoute from "../routes/AdminOrVolunteerRoute";
import DonationDetails from "../pages/DonationDetails/DonationDetails";
import BlogDetails from "../pages/Blog/BlogDetails/BlogDetails";

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
                path: '/donation-requests/:id',
                element: <PrivateRoute><DonationDetails /></PrivateRoute>
            },
            {
                path: 'blog',
                Component: Blog
            },
            {
                path: 'blog/:id',
                Component: BlogDetails
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
            },
            {
                path: 'my-donation-requests',
                Component: MyDonationRequests
            },
            {
                path: 'all-donation-request',
                Component: AllDonationRequests
            },
            {
                path: 'all-users',
                Component: AllUsers
            },
            // ✅ Blog Management Pages
            {
                path: 'content-management',
                element: <AdminOrVolunteerRoute><ContentManagement /></AdminOrVolunteerRoute>
            },
            {
                path: 'content-management/add-blog',
                element: <AdminOrVolunteerRoute><AddBlog /></AdminOrVolunteerRoute>
            },
            {
                path: 'content-management/edit-blog/:id',
                element: <AdminOrVolunteerRoute><EditBlog /></AdminOrVolunteerRoute>
            }

        ]
    }

])