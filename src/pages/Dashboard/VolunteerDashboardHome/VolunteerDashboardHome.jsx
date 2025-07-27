import useAuth from "../../../hooks/useAuth";

const VolunteerDashboardHome = () => {
    const { user } = useAuth();

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-base-content">
                Welcome, {user?.displayName || 'Volunteer'} 👋
            </h2>
            <p className="text-base-content/70">
                You can view and manage blood donation requests from this dashboard.
            </p>

            <div className="mt-6">
                <p className="text-base-content">To get started, go to:</p>
                <a href="/dashboard/all-donation-request" className="btn btn-primary mt-2">
                    Manage Blood Requests
                </a>
            </div>
        </div>
    );
};

export default VolunteerDashboardHome;