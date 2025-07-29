import { FaLock, FaHome } from 'react-icons/fa'; // Import relevant icons from react-icons
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="flex p-3 sm:p-0 items-center justify-center min-h-auto sm:min-h-screen bg-base-200">
            <div className="text-center p-6 shadow-lg hover:shadow-2xl rounded-xl border border-base-300">
                {/* Lock Icon above the heading */}
                <FaLock className="text-6xl text-error mx-auto" />

                <h2 className="text-6xl font-extrabold text-error mt-4">403</h2>
                <p className="text-xl mt-4">Forbidden - You don't have permission to access this page.</p>
                <p className="text-sm mt-2">Please check your credentials or contact support.</p>

                {/* Go back button with home icon */}
                <Link
                    className="btn btn-primary mt-5 font-bold flex items-center w-fit mx-auto justify-center"
                    to="/">
                    <FaHome className="mr-2" /> Go back!
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;