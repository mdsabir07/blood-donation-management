import ThemeToggle from '../../../Shared/ThemeToggle/ThemeToggle';
import { Link, NavLink } from 'react-router';
import { FaUser, FaPlusSquare, FaClipboardList, FaListAlt, FaUsers, FaCog, FaBlog, FaSignOutAlt } from 'react-icons/fa';
import AuthLogOut from '../../../Authentication/AuthLogOut/AuthLogOut';

const SideNav = () => {

    const navItems = <>
        <li>
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaUser className="text-lg" />
                Profile
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaPlusSquare className="text-lg" />
                Create Donation Request
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/my-donation-requests"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaClipboardList className="text-lg" />
                My Donation Requests
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/all-donation-request"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaListAlt className="text-lg" />
                All Donation Requests
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaUsers className="text-lg" />
                All Users
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/funding"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaUsers className="text-lg" />
                Funding
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/content-management"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaCog className="text-lg" />
                Content Management
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/content-management/add-blog"
                className={({ isActive }) =>
                    isActive ? 'active flex items-center gap-2' : 'flex items-center gap-2'
                }
            >
                <FaBlog className="text-lg" />
                Add Blog
            </NavLink>
        </li>
        <li className='flex flex-row items-center whitespace-wrap'>
            <FaSignOutAlt size={30} className='pr-0'/>
            <AuthLogOut>
                Logout
            </AuthLogOut>
        </li>
        <li><ThemeToggle /></li>
        <li><Link to="/" className="btn btn-primary rounded-sm px-3 py-3 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
            Back to Main Home Pange
        </Link></li>
    </>
    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content gap-2 bg-base-100 rounded-box z-1 mt-3 w-xs right-0 p-2 shadow">
                    {navItems}
                </ul>
            </div>

            <div className="hidden lg:flex">
                <ul className="menu gap-3">
                    {navItems}
                </ul>
            </div>
        </>

    );
};

export default SideNav;