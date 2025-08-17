import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import ContactUs from '../ContactUs/ContactUs';
import SearchDonors from '../../SearchDonors/SearchDonors';
import ReUseBlogCard from '../../Blog/ReUseBlogCard';
import TestimonialCarousel from '../../Shared/TestimonialCarousel/TestimonialCarousel';
import CallToAction from '../../Shared/CallToAction/CallToAction';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 pt-10 lg:pt-0'>
            <Banner />
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500">
                <SearchDonors />
            </div>
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="3000">
                <Features />
            </div>

            <div className="mt-10" data-aos="fade-up" data-aos-delay="500" data-aos-duration="3000">
                <h2 className="text-4xl font-bold text-center mb-10">Featured Blog Posts</h2>
                <ReUseBlogCard limit={3} featuredOnly={true} sortOrder="asc" />
            </div>
            <ContactUs />
            {/* <div className="mt-10 py-8" data-aos="fade-up" data-aos-delay="500" data-aos-duration="3000">
                <h2 className="text-4xl font-bold text-center mb-10">Popular Blog Posts</h2>
                <ReUseBlogCard limit={3} sortOrder="asc" />
            </div> */}
            <TestimonialCarousel />
            <div className="mb-10 sm:mb-20" data-aos="fade-up" data-aos-delay="500" data-aos-duration="3000">
                <h2 className="text-4xl font-bold text-center mb-10">Latest Blog Posts</h2>
                <ReUseBlogCard limit={3} sortOrder="desc" />
            </div>
            <CallToAction />
        </div>
    );
};

export default Home;