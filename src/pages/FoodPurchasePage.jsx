import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify'; // Import toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

const FoodPurchasePage = () => {
  const { id } = useParams(); // Get food id from URL
  const { user } = useContext(AuthContext); // Get the logged-in user details from context
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch food details using food id from API
  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch food details');
        }
        return res.json();
      })
      .then((data) => setFood(data))
      .catch((error) => {
        console.error('Error fetching food details:', error);
        toast.error('Failed to load food details.');
      });
  }, [id]);

  // Handle form submission to process the purchase
  const handlePurchase = () => {
    if (!food) {
      toast.error('Food details not available.');
      return;
    }
    if (quantity > food.quantity) {
      toast.error('Not enough stock available!');
      return;
    }

    const orderData = {
      foodId: food._id,
      foodName: food.name,
      price: food.price,
      quantity: quantity,
      buyerName: user.displayName || user.email,
      buyerEmail: user.email,
    };

    // Send the order data to the backend (example: POST request to API)
    fetch('http://localhost:3000/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to place order');
        }
        return response.json();
      })
      .then(() => {
        // Show success toast and navigate to another page (optional)
        toast.success('Purchase successful! Your order has been placed.');
        navigate('/my-orders'); // Redirect to orders page
      })
      .catch((error) => {
        console.error('Error making purchase:', error);
        toast.error('An error occurred while processing the purchase.');
      });
  };

  // Function to format price safely
  const formatPrice = (price) => {
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : 'N/A';
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Purchase {food.name}</h1>
      <form className="space-y-6">
        {/* Food Name */}
        <div className="mb-4">
          <label htmlFor="foodName" className="block text-lg font-semibold">Food Name</label>
          <input
            type="text"
            id="foodName"
            value={food.name}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold">Price</label>
          <input
            type="text"
            id="price"
            value={`$${formatPrice(food.price)}`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-lg font-semibold">Quantity</label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={food.quantity}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(Math.max(e.target.value, 1), food.quantity))}
            className="input input-bordered w-full"
          />
          <p className="text-sm text-gray-500">
            {food.quantity === 0
              ? 'This food is out of stock.'
              : `Available quantity: ${food.quantity}`}
          </p>
        </div>

        {/* Buyer Name (Read-only) */}
        <div className="mb-4">
          <label htmlFor="buyerName" className="block text-lg font-semibold">Buyer Name</label>
          <input
            type="text"
            id="buyerName"
            value={user?.displayName || user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Buyer Email (Read-only) */}
        <div className="mb-4">
          <label htmlFor="buyerEmail" className="block text-lg font-semibold">Buyer Email</label>
          <input
            type="email"
            id="buyerEmail"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Buying Date */}
        <div className="mb-4">
          <label htmlFor="buyingDate" className="block text-lg font-semibold">Buying Date</label>
          <input
            type="text"
            id="buyingDate"
            value={new Date().toLocaleString()}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Purchase Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={handlePurchase}
            className="btn btn-primary w-full"
            disabled={food.quantity === 0 || quantity > food.quantity}
          >
            {food.quantity === 0 ? 'Out of Stock' : 'Purchase'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FoodPurchasePage;
