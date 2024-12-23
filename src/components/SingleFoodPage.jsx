import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SingleFoodPage = () => {
  const { id } = useParams(); // Get food id from URL
  const [food, setFood] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0);
  const navigate = useNavigate();

  // Fetch food details using food id from API
  useEffect(() => {
    fetch(`/api/foods/${id}`) // Replace with your actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setPurchaseCount(data.purchaseCount || 0); // Default to 0 if purchaseCount is not available
      })
      .catch((error) => console.error('Error fetching food details:', error));
  }, [id]);

  // Handle redirect to purchase page
  const handlePurchase = () => {
    navigate(`/purchase/${id}`); // Redirect to the purchase page of the specific food
  };

  // Render the food details page if the food exists
  if (!food) return <div>Loading...</div>;

  return (
    <div className="py-12 bg-gray-100">
      {/* Food Details Section */}
      <section className="container mx-auto flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/2">
          <img src={food.image} alt={food.name} className="rounded-lg shadow-xl" />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{food.name}</h1>
          <p className="text-lg mb-4">{food.description}</p>
          <p className="text-xl font-semibold mb-4">Price: ${food.price.toFixed(2)}</p>
          <p className="text-lg mb-4">Available Quantity: {food.quantity}</p>
          <p className="text-lg mb-4">Purchase Count: {purchaseCount}</p>
          
          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            className="btn btn-primary"
            disabled={food.quantity === 0} // Disable button if the food is out of stock
          >
            {food.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </button>
        </div>
      </section>
      
      {/* Additional Information Section */}
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Other Details</h2>
        <p className="text-lg">{food.additionalInfo || 'No additional information available.'}</p>
      </section>
    </div>
  );
};

export default SingleFoodPage;
