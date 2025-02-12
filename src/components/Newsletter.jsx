import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        if (email.trim() === "") {
            toast.error("Please enter a valid email address.");
            return;
        }

        toast.success("Successfully subscribed to the newsletter! 🎉");
        setEmail(""); // Clear input field after subscribing
    };

    return (
        <section className="py-16 mt-10 mb-10">
            <div className="max-w-3xl mx-auto px-6 lg:px-16 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                    <FaPaperPlane className="text-yellow-400 text-6xl mb-4" />
                </div>

                {/* Heading */}
                <h2 className="text-4xl font-extrabold text-gray-700 mb-3">
                    Join Our <span className="text-yellow-500">Newsletter</span>
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-900 mb-6">
                    Stay ahead with exclusive offers, delicious recipes, and exciting updates. Sign up now!
                </p>

                {/* Input & Button Section */}
                <div className="max-w-xl w-full mx-auto flex flex-col sm:flex-row items-center gap-4 bg-white p-7 md:p-4 rounded-full shadow-lg">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full min-w-0 p-3 md:p-4 text-slate-500 text-base md:text-lg rounded-full border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                        onClick={handleSubscribe}
                        className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-5 md:px-6 py-3 md:py-4 rounded-full shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        Subscribe <FaPaperPlane className="text-lg md:text-xl" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
