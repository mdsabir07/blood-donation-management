import { FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
                <p className="text-center mb-10">
                    Have questions or want to get involved? We'd love to hear from you.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <form className="space-y-6 p-6 rounded-box shadow">
                        <div>
                            <label className="label" htmlFor="name">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="input input-bordered bg-transparent border-primary w-full"
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
                                className="input input-bordered bg-transparent border-primary w-full"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="label" htmlFor="message">
                                <span className="label-text">Message</span>
                            </label>
                            <textarea
                                id="message"
                                className="textarea textarea-bordered bg-transparent border-primary w-full h-32"
                                placeholder="Type your message here..."
                            ></textarea>
                        </div>

                        <button className="btn btn-primary w-full">Send Message</button>
                    </form>

                    {/* Contact Info */}
                    <div className="p-6 rounded-box shadow flex flex-col justify-center items-start space-y-4">
                        <h3 className="text-2xl font-semibold">Get in Touch</h3>
                        <p className="">We're here to support your donation journey.</p>
                        <div className="flex items-center gap-3 mt-4">
                            <FaPhoneAlt className="text-primary text-xl" />
                            <span className="text-lg">+1 (234) 567-8901</span>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm ">
                                Available Mon–Fri, 9:00AM–5:00PM (Local Time)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;