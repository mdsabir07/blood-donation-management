import { Outlet } from "react-router";
import SideNav from "../pages/Dashboard/DashComponents/SideNav/SideNav";

const DashboardLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-base-200 text-base-content">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-base-100 shadow-md p-4 flex flex-row sm:flex-col justify-between sm:justify-start items-center">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
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