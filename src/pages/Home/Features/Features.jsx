import { FaHeartbeat, FaUsers, FaTint, FaHandHoldingHeart } from "react-icons/fa";

const features = [
    {
        icon: <FaHeartbeat className="text-primary text-5xl" />,
        title: "Life-Saving Impact",
        description: "Your blood donation can save up to three lives. Be the reason someone gets a second chance.",
    },
    {
        icon: <FaUsers className="text-primary text-5xl" />,
        title: "Community Driven",
        description: "Join a network of donors and volunteers committed to making a difference together.",
    },
    {
        icon: <FaTint className="text-primary text-5xl" />,
        title: "Easy & Secure Process",
        description: "Our donation process is streamlined, safe, and supported by certified medical professionals.",
    },
    {
        icon: <FaHandHoldingHeart className="text-primary text-5xl" />,
        title: "Track Your Donations",
        description: "Receive updates and see the real-world impact of your blood donations through your dashboard.",
    },
];

const Features = () => {
    return (
        <section className="py-16">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Why Donate With Us?</h2>
                <p className="text-lg mb-10">We make giving blood meaningful, modern, and impactful.</p>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="card-body items-center text-center">
                                {feature.icon}
                                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                                <p className="">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;