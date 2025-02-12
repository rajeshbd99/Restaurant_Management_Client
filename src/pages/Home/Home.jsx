import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopFoodCard from '../../components/TopFoodCard';
import Newsletter from '../../components/Newsletter';
import CustomerReviews from '../../components/CustomerReviews';
import backgroundImage from '../../assets/banner.jpg';
import ChefSpecials from '../../components/ChefSpecials';
import { Circles } from 'react-loader-spinner';

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | Home";
    document.title = pageTitle;
  }, [location]);
  const [topFoods, setTopFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://restaurants-server-theta.vercel.app/foods');
        const data = await response.json();
        const sortedFoods = data.sort((a, b) => b.purchaseCount - a.purchaseCount);
        setTopFoods(sortedFoods);
      } catch (error) {
        console.error('Error fetching top foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="">
      {/* Banner Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center mt-10 mb-10 rounded-2xl"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        }}
      >
        <div className="container mx-auto  px-6 lg:px-12 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Welcome to <span className="text-yellow-400">DineFusion</span>
            </h1>
            <p className="text-lg  lg:text-xl mb-8">
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
      <section className="py-16 mt-10 mb-10 rounded-2xl">
        <div className="mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-extrabold text-gray-700 text-center mb-12">
            Explore Our <span className="text-yellow-400">Top Foods</span>
          </h2>
          <p className="text-center text-lg text-gray-900 mb-12 max-w-3xl mx-auto">
            Discover the best dishes curated just for you. Relish the flavors that have won hearts and taste buds alike!
          </p>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                visible={true}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {topFoods.slice(0, 8).map((food) => (
                <TopFoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <button className="inline-block px-8 py-4 bg-yellow-600 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition duration-300">
              <NavLink
                to="/foods"
              >
                Browse All Foods
              </NavLink>
            </button>
          </div>
        </div>
      </section>

      {/* Chef Specials Section */}
      <ChefSpecials />

      {/* Customer Reviews Section */}
      <CustomerReviews />

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default Home;
