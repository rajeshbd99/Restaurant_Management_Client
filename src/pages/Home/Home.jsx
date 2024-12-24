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
    // Fetch the top-selling foods based on the number of purchases
    fetch('http://localhost:3000/foods') // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setTopFoods(data))
      .catch((error) => console.error('Error fetching top foods:', error));
  }, []);

  return (
    <div className="bg-base-100">
      {/* Banner Section */}
      <section className="hero bg-cover bg-center h-[500px]" style={{
                      backgroundImage: `url(${backgroundImage})`,
                    }}>
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to DineFusion</h1>
            <p className="mb-5">
              Discover a world of flavors. Taste the best culinary experiences at our restaurant.
            </p>
            <NavLink to="/foods" className="btn btn-primary">
              Explore All Foods
            </NavLink>
          </div>
        </div>
      </section>

      {/* Top Foods Section */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Top Foods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topFoods.slice(0, 6).map((food) => (
              <TopFoodCard key={food._id} food={food} />
            ))}
          </div>
          <div className="text-center mt-8">
            <NavLink to="/foods" className="btn btn-primary">
              See All
            </NavLink>
          </div>
        </div>
      </section>

      {/* Extra Section 1: Chef's Specials */}
      

{/* Extra Section 1: Chef's Specials */}
<section className="py-12">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">Chef's Specials</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[specialDish1, specialDish2, specialDish3].map((image, index) => (
        <div
          key={index}
          className="card shadow-xl bg-white p-4 border rounded-lg hover:shadow-2xl"
        >
          <img
            src={image}
            alt={`Special Dish ${index + 1}`}
            className="rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">Special Dish {index + 1}</h3>
          <p className="text-sm text-gray-600">
            A delightful blend of flavors crafted by our expert chefs.
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Extra Section 2: Customer Testimonials */}
      <section className="py-12 bg-base-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="card shadow-lg bg-white p-6 rounded-lg hover:shadow-2xl"
              >
                <p className="text-sm text-gray-600 mb-4">
                  "The food was absolutely fantastic, and the ambiance was
                  perfect for our evening out. Can't wait to come back!"
                </p>
                <h3 className="text-lg font-bold">- Customer {index + 1}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
