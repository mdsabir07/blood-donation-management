import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import ContactUs from '../ContactUs/ContactUs';
import SearchDonors from '../../SearchDonors/SearchDonors';
import ReUseBlogCard from '../../Blog/ReUseBlogCard';

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
            <ContactUs />

            <div className="mt-10">
                <h2 className="text-3xl font-bold mb-6">DESC Blog Posts</h2>
                <ReUseBlogCard limit={3} sortOrder="desc" />
                <h2 className="text-3xl font-bold mb-6">ASC Blog Posts</h2>
                <ReUseBlogCard limit={3} sortOrder="asc" />
                <h2 className="text-3xl font-bold mb-6">Featured Blog Posts</h2>
                <ReUseBlogCard limit={3} featuredOnly={true} sortOrder="asc" />
            </div>
        </div>
    );
};

export default Home;