import { NavLink } from 'react-router';
import DonateBloodLogo from '../DonateBloodLogo/DonateBloodLogo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useAuth from '../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import SideNav from '../../Dashboard/DashComponents/SideNav/SideNav';

const Navbar = () => {
    const { user } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = <>
        <li>
            <NavLink className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary font-semibold"} to="/">Home</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary font-semibold"} to="/donation-requests">Donation requests</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? "text-primary" : "hover:text-primary font-semibold"} to="/blog">Blog</NavLink>
        </li>

        {user ? (
            <>
                <li>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 border p-[2px] border-gray-300 rounded-full">
                                <img
                                    src={user.photoURL || "https://i.ibb.co/2nFqQ2x/default-avatar.png"}
                                    alt={user.displayName}
                                    title={user.displayName}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-full min-w-64 bg-base-100 right-0">
                            <SideNav />
                        </ul>
                    </div>
                </li>

            </>
        ) : (
            <>
                <li><NavLink to="/login" className='btn btn-primary'>Login</NavLink></li>
            </>
        )}
        <li><NavLink to="/dashboard/create-donation-request" className='btn btn-primary'>Donate Blood</NavLink></li>
    </>
    return (
        <div className={`shadow-sm fixed top-0 left-0 right-0 py-2 z-50 transition-colors duration-300 ${scrolled ? "shadow-md dark:backdrop-blur-2xl" : "bg-transparent"}`}>
            <div className="flex items-center w-full max-w-7xl mx-auto px-4">
                <div className="navbar-start flex-1">
                    <DonateBloodLogo />
                </div>
                <div className="navbar-end flex-auto">
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal items-center gap-2 px-1">
                            {navItems}
                        </ul>
                    </div>
                    {
                        !user && <ThemeToggle />
                    }
                    <div className="dropdown pl-2">
                        <div tabIndex={0} role="button" className="btn p-3 hover:bg-primary lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content w-full min-w-2xs right-0 bg-base-100 rounded-box z-1 mt-3 p-2 shadow gap-2">
                            {navItems}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;