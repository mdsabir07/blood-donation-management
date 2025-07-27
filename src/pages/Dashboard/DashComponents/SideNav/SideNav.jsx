import ThemeToggle from '../../../Shared/ThemeToggle/ThemeToggle';
import { NavLink } from 'react-router';

const SideNav = () => {

    const navItems = <>
        <li><NavLink to="/dashboard/profile">Profile</NavLink></li>
        <li><NavLink to="/dashboard/create-donation-request">Create Donate Request</NavLink></li>
        <li><NavLink to="/dashboard/my-donation-requests">My Donation Request</NavLink></li>
        <li><NavLink to="/dashboard/all-donation-request">All Donation Requests</NavLink></li>
        <li><NavLink to="/dashboard/all-users">All Users</NavLink></li>
        <li><NavLink to="/dashboard/content-management">Content management</NavLink></li>
        <li><NavLink to="/dashboard/content-management/add-blog">Add Blog</NavLink></li>
        <li><ThemeToggle /></li>
    </>
    return (
        <>
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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