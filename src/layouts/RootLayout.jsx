import React from 'react';
import Navbar from '../pages/Shared/Navbar/Navbar';
import Footer from '../pages/Shared/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
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