import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopFoodCard from '../../components/TopFoodCard';
import backgroundImage from '../../assets/banner.jpg';
import specialDish1 from '../../assets/extra1.jpg';
import specialDish2 from '../../assets/extra2.jpg';
import specialDish3 from '../../assets/extra3.jpg';

const Home = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/foods') // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => {
        // Sort foods by purchase count (descending) to determine top-selling
        const sortedFoods = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sortedFoods);
      })
      .catch((error) => console.error('Error fetching top foods:', error));
  }, []);

  return (
    <div className="bg-base-100">
      {/*Banner Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center mt-10 mb-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto px-6 lg:px-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-yellow-400">DineFusion</span>
            </h1>
            <p className="text-lg lg:text-xl mb-8">
              Explore a symphony of flavors and indulge in exquisite culinary experiences. Let's make every meal memorable!
            </p>
            <div className="flex justify-center gap-4">
              <NavLink
                to="/foods"
                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition duration-300"
              >
                Explore All Foods
              </NavLink>
            </div>
          </div>
        </div>
      </section>




      {/* Top Foods Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 via-white to-orange-100 mt-10 mb-10 rounded-2xl">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
            Explore Our <span className="text-orange-400">Top Foods</span>
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover the best dishes curated just for you. Relish the flavors that have won hearts and taste buds alike!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {topFoods.slice(0, 6).map((food) => (
              <TopFoodCard key={food._id} food={food} />
            ))}
          </div>
          <div className="text-center mt-12">
            <NavLink
              to="/foods"
              className="inline-block px-8 py-4 bg-yellow-500 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:shadow-xl transition duration-300"
            >
              Browse All Foods
            </NavLink>
          </div>
        </div>
      </section>


      {/* Chef's Specials Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-100 via-white to-yellow-100 mt-10 mb-10 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-4">
            Chef's <span className="text-yellow-400">Specials</span>
          </h2>

          <p className="text-xl text-center text-gray-600 max-w-4xl mx-auto mb-12">
            Available for a limited time, don't miss the chance to savor these mouthwatering delights!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[specialDish1, specialDish2, specialDish3].map((image, index) => (
              <div
                key={index}
                className="card bg-white border-2 border-yellow-300 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={image}
                  alt={`Special Dish ${index + 1}`}
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    Special Dish {index + 1}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    A delightful blend of flavors crafted by our expert chefs.
                  </p>
                  <button
                    className="btn btn-primary px-6 py-2 rounded-full text-white text-sm font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all duration-300"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-r from-red-100 via-white to-red-100 mb-10 rounded-2xl">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            What Our <span className="text-red-400">Customers</span> Say
          </h2>

          {/* Subheading */}
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Our customers love our culinary creations and welcoming atmosphere. Here's what they have to say about their experiences at DineFusion.
          </p>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
            {/* Testimonial 1 */}
            <div
              key={1}
              className="card bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-8">
                <p className="text-lg text-gray-700 italic mb-6">
                  "The food was absolutely fantastic, and the ambiance was perfect for our evening out. Can't wait to come back!"
                </p>
                <div className="flex items-center space-x-4">
                  {/* Customer Image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg" // Use the actual image URL or path
                      alt="Customer 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Alice Johnson</h3>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              key={2}
              className="card bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-8">
                <p className="text-lg text-gray-700 italic mb-6">
                  "The food was absolutely fantastic, and the ambiance was perfect for our evening out. Can't wait to come back!"
                </p>
                <div className="flex items-center space-x-4">
                  {/* Customer Image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg" // Use the actual image URL or path
                      alt="Customer 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">John Smith</h3>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              key={3}
              className="card bg-white border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-8">
                <p className="text-lg text-gray-700 italic mb-6">
                  "The food was absolutely fantastic, and the ambiance was perfect for our evening out. Can't wait to come back!"
                </p>
                <div className="flex items-center space-x-4">
                  {/* Customer Image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                      src="https://randomuser.me/api/portraits/women/2.jpg" // Use the actual image URL or path
                      alt="Customer 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Sarah Williams</h3>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
