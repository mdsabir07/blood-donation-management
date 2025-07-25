import { NavLink } from 'react-router';
import DonateBloodLogo from '../DonateBloodLogo/DonateBloodLogo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navbar = () => {
    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/donate-blood">Donate Blood</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
    return (
        <div className="navbar shadow-sm">
            <div className="navbar-start">
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
                <DonateBloodLogo />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-2">
                <button className='btn bg-primary cursor-pointer text-secondary'>Log out</button>
                <NavLink to="/login"><button className='btn bg-primary text-secondary'>Sign In</button></NavLink>
                <NavLink to="/donate-blood"><button className='btn bg-primary text-secondary'>Donate Blood</button></NavLink>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;