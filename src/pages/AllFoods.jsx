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
    fetch('http://localhost:3000/foods')
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
        className="page-title text-center py-12 bg-cover bg-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-4xl font-bold bg-black bg-opacity-50 inline-block px-4 py-2 rounded">
          All Foods
        </h1>
      </div>

      {/* Search Section */}
      <section className="bg-white py-8 px-4">
        <div className="container mx-auto flex justify-center">
          <input
            type="text"
            placeholder="Search for food..."
            className="input input-bordered w-full max-w-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary ml-4"
          >
            Search
          </button>
        </div>
      </section>

      {/* Food Cards Section */}
      <section className="py-12">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-center text-lg">Loading foods...</p>
          ) : message ? (
            <p className="text-center text-lg">{message}</p> // Show message if no result
          ) : filteredFoods.length === 0 ? (
            <p className="text-center text-lg">No foods found!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
