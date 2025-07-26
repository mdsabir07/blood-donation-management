import { NavLink } from 'react-router';
import DonateBloodLogo from '../DonateBloodLogo/DonateBloodLogo';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuth();
    console.log('User from useAuth:', user);
    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "LogOut successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }
    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        {
            user ? <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><button onClick={handleLogOut} className='btn bg-primary cursor-pointer'>Log out</button></li>
                
            </>
            : <li><NavLink to="/login" className='btn bg-primary'>Login</NavLink></li>
        }
        <li><NavLink to="/donate-blood" className='btn bg-primary'>Donate Blood</NavLink></li>
    </>
    return (
        <div className="navbar shadow-sm">
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
                        className="menu menu-sm dropdown-content bg-base-100 text-white rounded-box z-1 mt-3 w-52 p-2 shadow gap-2 right-0">
                        {navItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;