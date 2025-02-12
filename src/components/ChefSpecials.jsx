import { NavLink } from "react-router-dom";
import specialDish1 from "../assets/extra1.jpg";
import specialDish2 from "../assets/extra2.jpg";
import specialDish3 from "../assets/extra3.jpg";
import specialDish4 from "../assets/extra4.jpg";

const ChefSpecials = () => {
    const specials = [
        {
            image: specialDish1,
            name: "Sizzling Steak Delight",
            description: "A tender, juicy steak grilled to perfection and served with our signature garlic butter sauce."
        },
        {
            image: specialDish2,
            name: "Fiery Spicy Pasta",
            description: "A delightful fusion of spicy marinara, fresh basil, and hand-tossed pasta for a perfect balance of heat and flavor."
        },
        {
            image: specialDish3,
            name: "Exotic Sushi Platter",
            description: "An artistic combination of fresh sushi rolls, sashimi, and delicate nigiri for the ultimate seafood experience."
        },
        {
            image: specialDish4,
            name: "Creamy Mushroom Risotto",
            description: "Rich and creamy Arborio rice infused with truffle oil, parmesan cheese, and wild mushrooms."
        }
    ];

    return (
        <section className="py-16 mt-10 mb-10 rounded-2xl">
            <div className="mx-auto px-6 lg:px-20">
                <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-6">
                    Chef's <span className="text-yellow-500">Specials</span>
                </h2>
                <p className="text-xl text-center text-gray-700 max-w-4xl mx-auto mb-12">
                    Available for a limited time, savor these exclusive delights handpicked by our expert chefs!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {specials.map((dish, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border border-yellow-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{dish.name}</h3>
                                <p className="text-sm text-gray-600 mb-4">{dish.description}</p>
                                <NavLink
                                    to="/foods"
                                    className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition duration-300"
                                >
                                    Order Now
                                </NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChefSpecials;
