import { NavLink } from 'react-router';
import DonateBloodLogo from '../DonateBloodLogo/DonateBloodLogo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useAuth from '../../../hooks/useAuth';
import AuthLogOut from '../../Authentication/AuthLogOut/AuthLogOut';
import { useEffect, useState } from 'react';

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
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/donation-requests">Donation requests</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>

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
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-100 right-0">
                            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                            <li><AuthLogOut /> </li>
                        </ul>
                    </div>
                </li>

            </>
        ) : (
            <>
                <li><NavLink to="/login" className='btn bg-primary'>Login</NavLink></li>
            </>
        )}
        <li><NavLink to="/dashboard/create-donation-request" className='btn bg-primary'>Donate Blood</NavLink></li>
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
                    <ThemeToggle />
                    <div className="dropdown pl-2">
                        <div tabIndex={0} role="button" className="btn p-3 hover:bg-primary lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-2 right-0">
                            {navItems}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;