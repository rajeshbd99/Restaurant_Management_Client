import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FoodCard from '../components/FoodCard';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all foods from the API or database
  useEffect(() => {
    fetch('/api/foods') // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error('Error fetching foods:', error));
  }, []);

  // Filter foods based on search term
  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Page Title Section */}
      <section className="bg-gray-200 text-center py-16">
        <h1 className="text-4xl font-bold">All Foods</h1>
      </section>

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
        </div>
      </section>

      {/* Food Cards Section */}
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllFoods;
