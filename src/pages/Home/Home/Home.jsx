import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import ContactUs from '../ContactUs/ContactUs';
import SearchDonors from '../../SearchDonors/SearchDonors';

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto px-4 pt-10 lg:pt-0'>
            <Banner />
            <SearchDonors />
            <Features />
            <ContactUs />
        </div>
    );
};

export default Home;