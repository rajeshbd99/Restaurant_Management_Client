import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner'; // Import the Spinner component

const SingleFoodPage = () => {
  const { id } = useParams(); // Get food ID from URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`https://restaurants-server-theta.vercel.app/foods/${id}`); // Correct URL scheme
        if (!response.ok) {
          throw new Error(`Error fetching food: ${response.statusText}`);
        }
        const data = await response.json();
        setFood(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  const handlePurchase = () => {
    navigate(`/purchase/${id}`); // Redirect to purchase page
  };

  // Function to format price if it's a valid number
  const formatPrice = (price) => {
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : 'N/A';
  };

  if (loading) return <Spinner />; // Show spinner while loading
  if (error) return <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>;
  if (!food) return <div className="text-center text-xl font-semibold">Food not found</div>;

  return (
    <div className="bg-gray-50 py-16">
      <section className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-12">
        {/* Food Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Food Details Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800">{food.name}</h1>
          <p className="text-lg text-gray-600">{food.description}</p>
          <p className="text-xl font-bold text-green-600">Price: ${formatPrice(food.price)}</p>
          <p className="text-lg text-gray-600">Available Quantity: {food.quantity}</p>
          <p className="text-lg text-gray-600">Purchase Count: {food.purchaseCount || 0}</p>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className={`px-6 py-3 mt-4 rounded-md text-white font-semibold transition-all duration-300 ${
              food.quantity === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={food.quantity === 0}
          >
            {food.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </button>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="container mx-auto px-6 md:px-12 py-12 bg-white rounded-lg shadow-lg mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Additional Details</h2>
        <p className="text-lg text-gray-600">{food.additionalInfo || 'No additional information available.'}</p>
      </section>
    </div>
  );
};

export default SingleFoodPage;
