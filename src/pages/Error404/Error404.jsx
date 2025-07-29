import { Link, useLocation } from 'react-router';
const Error404 = () => {
    const location = useLocation();
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className='max-w-[1280px] mx-auto px-6 lg:px-0 grid gap-5 pt-8 pb-14 text-center justify-center'>
                <h1 className='text-error font-extrabold text-5xl'>404 - Page Not found!</h1>
                <p className="text-xl md:text-2xl my-3">
                    Opps! The page <code className='text-secondary font-bold'>{location.pathname}</code> you're looking for doesn't exist.
                </p>
                <Link to="/" className="px-8 py-3 btn btn-primary text-lg font-semibold rounded-sm">Go to Home</Link>
            </div>
        </div>
    );
};

export default Error404;