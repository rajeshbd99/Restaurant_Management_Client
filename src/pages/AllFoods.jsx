import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import { Circles } from 'react-loader-spinner';
import backgroundImage from '../assets/bgAll.jpg';
import { motion } from 'framer-motion';

const AllFoods = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "DineFusion | All Foods";
  }, [location]);

  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Fetch all foods initially
  useEffect(() => {
    setLoading(true);
    fetch('https://restaurants-server-theta.vercel.app/foods', { withCredentials: true })
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
        setLoading(false);
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
    setMessage('');
    const matchedFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedFoods.length === 0) {
      setMessage('No foods found!');
    }
    setFilteredFoods(matchedFoods);
    setLoading(false);
  };

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedFoods = [...filteredFoods];

    if (order === 'asc') {
      sortedFoods.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedFoods.sort((a, b) => b.price - a.price);
    }

    setFilteredFoods(sortedFoods);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5, ease: 'easeOut' } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Page Title Section */}
      <motion.div
        className="page-title text-center py-16 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        variants={containerVariants}
      >
        <h1 className="text-5xl font-bold bg-black bg-opacity-60 inline-block px-6 py-4 rounded-lg">
          All Foods
        </h1>
      </motion.div>

      {/* Search & Sorting Section */}
      <section className="py-8 px-4">
        <div className="mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for food..."
            className="input input-bordered w-full md:max-w-lg px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="btn btn-primary px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
          >
            Search
          </button>

          {/* Sorting Dropdown */}
          <select
            className="sorting select select-bordered px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Show Spinner when loading */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" visible={true} />
        </div>
      )}

      {/* Food Cards Section */}
      <section className="py-12">
        <motion.div className="container mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
          {loading ? (
            <p className="text-center text-lg font-semibold">Loading foods...</p>
          ) : message ? (
            <p className="text-center text-lg font-semibold text-red-500">{message}</p>
          ) : filteredFoods.length === 0 ? (
            <p className="text-center text-lg font-semibold">No foods found!</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {filteredFoods.map((food) => (
                <motion.div
                  key={food._id}
                  variants={cardVariants}
                  className="flex justify-center"
                >
                  <div className="w-full max-w-xs aspect-[4/5] flex flex-col">
                    <FoodCard food={food} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default AllFoods;
