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
import Funding from "../pages/Dashboard/Funding/Funding";
import Error404 from "../pages/Error404/Error404";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
                handle: { title: 'Home - Blood Donation Management' }
            },
            {
                path: 'donation-requests',
                Component: DonationRequest,
                handle: { title: 'Donation request - Blood Donation Management' }
            },
            {
                path: '/donation-requests/:id',
                element: <PrivateRoute><DonationDetails /></PrivateRoute>,
                handle: { title: 'Donation request - Blood Donation Management' }
            },
            {
                path: 'blog',
                Component: Blog,
                handle: { title: 'Blog - Blood Donation Management' }
            },
            {
                path: 'blog/:id',
                Component: BlogDetails,
                handle: { title: 'Blog details - Blood Donation Management' }
            },
            {
                path: 'register',
                Component: Register,
                handle: { title: 'Register - Blood Donation Management' }
            },
            {
                path: 'login',
                Component: Login,
                handle: { title: 'Login - Blood Donation Management' }
            },
            {
                path: 'search-donors',
                Component: SearchDonors,
                handle: { title: 'Search donors - Blood Donation Management' }
            },
            {
                path: 'forbidden',
                Component: Forbidden,
                handle: { title: 'Forbidden - Blood Donation Management' }
            }
        ]
    },
    {
        path: '*',
        Component: Error404,
        handle: { title: '404 - Blood Donation Management' }
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        handle: { title: 'Dashboard - Blood Donation Management' },
        children: [
            {
                index: true,
                Component: DashboardHome,
                handle: { title: 'Dashboard Home - Blood Donation Management' }
            },
            {
                path: 'profile',
                Component: Profile,
                handle: { title: 'Profile - Blood Donation Management' }
            },
            {
                path: 'create-donation-request',
                Component: CreateDonationRequest,
                handle: { title: 'Create donation request - Blood Donation Management' }
            },
            {
                path: 'my-donation-requests',
                Component: MyDonationRequests,
                handle: { title: 'My donation requests - Blood Donation Management' }
            },
            {
                path: 'all-donation-request',
                Component: AllDonationRequests,
                handle: { title: 'All donation request - Blood Donation Management' }
            },
            {
                path: 'all-users',
                Component: AllUsers,
                handle: { title: 'All users - Blood Donation Management' }
            },
            {
                path: 'funding',
                Component: Funding,
                handle: { title: 'Funding - Blood Donation Management' }
            },
            {
                path: 'content-management',
                element: <AdminOrVolunteerRoute><ContentManagement /></AdminOrVolunteerRoute>,
                handle: { title: 'Content Management - Blood Donation Management' }
            },
            {
                path: 'content-management/add-blog',
                element: <AdminOrVolunteerRoute><AddBlog /></AdminOrVolunteerRoute>,
                handle: { title: 'Add blog - Blood Donation Management' }
            },
            {
                path: 'content-management/edit-blog/:id',
                element: <AdminOrVolunteerRoute><EditBlog /></AdminOrVolunteerRoute>,
                handle: { title: 'Edit blog - Blood Donation Management' }
            }

        ]
    }

])