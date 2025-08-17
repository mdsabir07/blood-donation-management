import { Outlet } from "react-router";
import SideNav from "../pages/Dashboard/DashComponents/SideNav/SideNav";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-base-200 text-base-content">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-base-100 shadow-md px-4 py-3 sm:py-6 flex flex-row sm:flex-col justify-between sm:justify-start items-center">
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