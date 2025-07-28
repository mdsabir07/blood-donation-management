import { Link, Outlet } from "react-router";
import SideNav from "../pages/Dashboard/DashComponents/SideNav/SideNav";
import { FaHome } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-base-200 text-base-content">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-base-100 shadow-md px-4 py-6 flex flex-row sm:flex-col justify-between sm:justify-start items-center">
                <Link className="text-xl hover:text-primary font-bold flex items-center w-full gap-2" to="/dashboard">
                    <FaHome className="text-xl" />
                    Dashboard
                </Link>
                <SideNav />
            </aside>

            {/* Content */}
            <main className="flex-1 p-6 bg-base-100">
                <Outlet />
            </main>
        </div>

    );
};

export default DashboardLayout;