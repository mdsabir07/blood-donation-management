import { Link, Outlet } from "react-router";
import SideNav from "../pages/Dashboard/DashComponents/SideNav/SideNav";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-base-200 text-base-content">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-base-100 shadow-md px-4 py-6 flex flex-row sm:flex-col justify-between sm:justify-start items-center">
                <Link className="text-xl hover:text-primary font-bold mb-4" to="/dashboard">Dashboard</Link>
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