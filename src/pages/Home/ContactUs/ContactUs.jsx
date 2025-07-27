import { FaPhoneAlt, FaRegClock } from "react-icons/fa";
import getInTouch from '../../../assets/bd7.png';

const ContactUs = () => {
    return (
        <section className="py-16">
            <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
            <p className="text-center mb-10">
                Have questions or want to get involved? We'd love to hear from you.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Contact Form */}
                <form className="space-y-6 p-6 rounded-box shadow">
                    
                    <h3 className="text-2xl font-semibold">Get in Touch</h3>
                    <div>
                        <label className="label" htmlFor="name">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="input input-bordered bg-transparent w-full"
                            placeholder="Your full name"
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input input-bordered bg-transparent w-full"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="label" htmlFor="message">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            id="message"
                            className="textarea textarea-bordered bg-transparent w-full h-32"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>

                    <button className="btn btn-primary w-full">Send Message</button>
                </form>

                {/* Contact Info */}
                <div className="p-6 rounded-box shadow flex flex-col justify-center items-start space-y-4">
                    <img src={getInTouch} alt="" className="max-w-lg" />
                    <p className="">We're here to support your donation journey.</p>
                    <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                        <div className="flex items-center gap-3">
                        <FaPhoneAlt className="text-primary text-xl" />
                        <span className="">+1 (234) 567-8901</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <FaRegClock className="text-primary text-xl" />
                        <p>Available Mon–Fri, 9:00AM–5:00PM (Local Time)</p>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;