import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleFoodPage = () => {
  const { id } = useParams(); // Get food ID from URL
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(`http://localhost:3000/foods/${id}`);
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
    navigate(`/purchase/${_id}`); // Redirect to purchase page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!food) return <div>Food not found</div>;

  return (
    <div className="py-12 bg-gray-100">
      <section className="container mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <img src={food.image} alt={food.name} className="rounded-lg shadow-xl" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{food.name}</h1>
          <p className="text-lg mb-4">{food.description}</p>
          <p className="text-xl font-semibold mb-4">Price: ${food.price?.toFixed(2)}</p>
          <p className="text-lg mb-4">Available Quantity: {food.quantity}</p>
          <p className="text-lg mb-4">Purchase Count: {food.purchaseCount || 0}</p>
          <button
            onClick={handlePurchase}
            className="btn btn-primary"
            disabled={food.quantity === 0}
          >
            {food.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </button>
        </div>
      </section>
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Other Details</h2>
        <p className="text-lg">{food.additionalInfo || 'No additional information available.'}</p>
      </section>
    </div>
  );
};

export default SingleFoodPage;
