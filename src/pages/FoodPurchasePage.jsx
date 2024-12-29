import { useState, useEffect } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner'; // Import a spinner component

const FoodPurchasePage = () => {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = "DineFusion | Purchase Food";
    document.title = pageTitle;
  }, [location]);
  const { id } = useParams(); // Get food id from URL
  const { user } = useContext(AuthContext); // Get the logged-in user details from context
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`https://restaurants-server-theta.vercel.app/foods/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch food details');
        }
        return res.json();
      })
      .then((data) => {
        setFood(data);
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error('Error fetching food details:', error);
        toast.error('Failed to load food details.');
        setLoading(false); // End loading even if there's an error
      });
  }, [id]);

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

    fetch('https://restaurants-server-theta.vercel.app/orders', {
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
        toast.success('Purchase successful! Your order has been placed.');
        navigate('/my-orders');
      })
      .catch((error) => {
        console.error('Error making purchase:', error);
        toast.error('An error occurred while processing the purchase.');
      });
  };

  const formatPrice = (price) => {
    return typeof price === 'number' && !isNaN(price) ? price.toFixed(2) : 'N/A';
  };

  if (loading) return <Spinner />; // Show spinner during loading

  if (!food)
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-3xl text-gray-800">Food details not found.</h2>
      </div>
    );

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Purchase {food.name}</h1>
      <form className="space-y-6">
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
