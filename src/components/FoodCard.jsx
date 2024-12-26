import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const { name, image, price, quantity, _id, addedBy } = food;

  // Mocked logged-in user (replace with real logic if needed)
  const user = JSON.parse(localStorage.getItem('user'));

  const isOutOfStock = quantity === 0;
  const isOwnFood = user && user.id === addedBy;

  // Manage purchase quantity
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = Math.min(event.target.value, quantity);
    setPurchaseQuantity(newQuantity);
  };

  const handlePurchase = () => {
    if (isOutOfStock || isOwnFood || purchaseQuantity > quantity) return;
    alert(`Purchased ${purchaseQuantity} of ${name}`);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-10 mt-10">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        {isOutOfStock && (
          <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-75 text-white text-sm px-3 py-1 rounded-br-lg">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 truncate">{name}</h2>
        <p className="text-gray-600 mt-2">
          Price: <span className="font-semibold">${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</span>
        </p>
        <p className="text-gray-600">
          Available: <span className="font-semibold">{quantity}</span>
        </p>

        {/* Purchase Controls */}
        <div className="mt-4 flex items-center space-x-3">
          <input
            type="number"
            min="1"
            max={quantity}
            value={purchaseQuantity}
            onChange={handleQuantityChange}
            disabled={isOutOfStock || isOwnFood}
            className="w-16 border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || isOwnFood || purchaseQuantity > quantity}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
              isOutOfStock || isOwnFood || purchaseQuantity > quantity
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : isOwnFood ? 'Cannot Buy' : 'Purchase'}
          </button>
        </div>

        {/* Actions Section */}
        <div className="mt-4 text-right">
          <NavLink
            to={`/foods/${_id}`}
            className="text-indigo-600 font-medium hover:underline"
          >
            View Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
