import { FaStar, FaQuoteLeft } from "react-icons/fa";
import client1 from "../assets/client1.jpg";
import client2 from "../assets/client5.jpg";
import client3 from "../assets/client6.jpg";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    text: "The food was absolutely delicious and fresh. Highly recommend!",
    rating: 5,
    image: client1,
  },
  {
    id: 2,
    name: "Sarah Lee",
    text: "DineFusion never disappoints. Their dishes are top-notch!",
    rating: 4.5,
    image: client2,
  },
  {
    id: 3,
    name: "Michael Smith",
    text: "Amazing experience! The ambiance and food were perfect.",
    rating: 5,
    image: client3,
  },
];

const CustomerReviews = () => {
  return (
    <section className="py-16 mt-10 mb-10 rounded-2xl">
      <div className="mx-auto px-6 lg:px-20 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-700 mb-4 md:mb-6 flex items-center justify-center gap-2 text-center">
          <FaQuoteLeft className="text-yellow-500 text-3xl md:text-4xl" />
          What Our <span className="text-yellow-400">Customers Say</span>
        </h2>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white shadow-xl rounded-lg text-center border-l-4 border-yellow-500 hover:shadow-2xl transition-all duration-300"
            >
              {/* Reviewer Image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-fill border-2 border-yellow-500"
              />

              {/* Review Text */}
              <p className="text-lg italic text-gray-700">"{review.text}"</p>

              {/* Star Rating */}
              <div className="flex justify-center mt-3 text-yellow-500">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-xl" />
                ))}
                {review.rating % 1 !== 0 && <FaStar className="text-xl opacity-50" />}
              </div>

              {/* Reviewer Name */}
              <h3 className="mt-4 font-bold text-gray-900">{`- ${review.name}`}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
