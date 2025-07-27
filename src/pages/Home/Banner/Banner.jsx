import { Link } from 'react-router';
import banner from '../../../assets/bd5.png';

const Banner = () => {
    return (
        <section className="">
            <div className="flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between">
                <div className="flex-1 flex flex-col justify-center text-center rounded-sm lg:text-left">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl">Your <span className='text-primary font-extrabold'>Blood</span> Can <br /> Change a Life</h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Every drop counts. Join us in making a life-saving impact by donating blood today. Be a hero — it's in your blood</p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <Link className='btn btn-sm sm:btn-lg btn-primary' to="/register">Join as a donor</Link>
                        <Link className='btn btn-sm sm:btn-lg btn-outline btn-primary' to="/search-donors">Search Donors</Link>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center mt-8 lg:mt-0">
                    <img src={banner} alt="" className="w-full" />
                </div>
            </div>
        </section>
    );
};

export default Banner;