import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const RootLayout = () => {
    useEffect(() => {
        AOS.refresh(); 
    }, []);

    return (
        <>
            <Navbar />
            <main className='pt-12'>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default RootLayout;