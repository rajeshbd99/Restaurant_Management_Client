import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import backgroundImage from '../assets/bgAll.jpg';

const AllFoods = () => {
  const [foods, setFoods] = useState([]); // Stores all foods
  const [filteredFoods, setFilteredFoods] = useState([]); // Stores filtered foods (search results)
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Message when no foods found

  // Fetch all foods initially
  useEffect(() => {
    setLoading(true); // Show loading state
    fetch('https://restaurants-server-theta.vercel.app/foods')
      .then((res) => res.json())
      .then((data) => {
        setFoods(data); // Set all foods
        setFilteredFoods(data); // Set filtered foods to all initially
        setLoading(false); // Hide loading state
      })
      .catch((error) => {
        console.error('Error fetching foods:', error);
        setMessage('Error fetching data!');
        setLoading(false);
      });
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    setLoading(true);
    setMessage(''); // Reset the message
    const matchedFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedFoods.length === 0) {
      setMessage('No foods found!');
    }
    setFilteredFoods(matchedFoods); // Update the filtered foods with the matched results
    setLoading(false); // Hide loading state
  };

  return (
    <div>
      {/* Page Title Section */}
      <div
        className="page-title text-center py-16 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-5xl font-bold bg-black bg-opacity-60 inline-block px-6 py-4 rounded-lg">
          All Foods
        </h1>
      </div>

      {/* Search Section */}
      <section className="bg-gray-100 py-8 px-4">
        <div className="container mx-auto flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for food..."
            className="input input-bordered w-full max-w-lg px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary ml-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </section>

      {/* Food Cards Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-center text-lg font-semibold">Loading foods...</p>
          ) : message ? (
            <p className="text-center text-lg font-semibold text-red-500">{message}</p> // Show message if no result
          ) : filteredFoods.length === 0 ? (
            <p className="text-center text-lg font-semibold">No foods found!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredFoods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AllFoods;
