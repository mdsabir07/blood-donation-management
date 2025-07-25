import { Link } from 'react-router';
import logo from '../../../assets/DonateBloodLogo.png'
const DonateBloodLogo = () => {
    return (
        <>
            <Link to="/"><img src={logo} alt="" className='w-20' /></Link>
        </>
    );
};

export default DonateBloodLogo;