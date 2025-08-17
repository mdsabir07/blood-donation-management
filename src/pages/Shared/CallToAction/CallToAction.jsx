import { Link } from "react-router";
import donateImg from '../../../assets/bd2.png'; 

const CallToAction = () => {
    return (
        <section className="py-8 sm:py-12 bg-base-200 rounded-box shadow-md">
            <div className="container max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
                {/* Text Content */}
                <div className="flex-1 space-y-5 text-center lg:text-left pl-0 md:pl-8">
                    <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                        Your Blood Can Save Lives
                    </h2>
                    <p className="text-base-content/80 text-lg max-w-xl mx-auto lg:mx-0">
                        Join our mission to make blood accessible to everyone in need. Be a hero — donate today and help change someone’s life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link to="/dashboard/create-donation-request" className="btn btn-primary">
                            Donate Now
                        </Link>
                        <Link to="/donation-requests" className="btn btn-outline btn-primary">
                            Find Donar
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1">
                    <img
                        src={donateImg}
                        alt="Donate Blood"
                        className=""
                        data-aos="zoom-in"
                        data-aos-delay="300"
                        data-aos-duration="1000"
                    />
                </div>
            </div>
        </section>
    );
};
export default CallToAction;