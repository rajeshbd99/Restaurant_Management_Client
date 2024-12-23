import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const FoodCard = ({ food }) => {
  const { name, image, price, quantity, _id, addedBy } = food;

  // Assuming 'user' is the logged-in user from context or props
  const user = JSON.parse(localStorage.getItem('user')); // Example to get user (adjust based on actual logic)

  const isOutOfStock = quantity === 0;
  const isOwnFood = user && user.id === addedBy; // Prevent users from buying their own added food items

  // Manage purchase quantity
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = Math.min(event.target.value, quantity); // Prevent exceeding available quantity
    setPurchaseQuantity(newQuantity);
  };

  const handlePurchase = () => {
    if (purchaseQuantity > quantity || isOutOfStock || isOwnFood) {
      return; // Prevent purchase if conditions are not met
    }
    // Handle purchase logic here
    alert(`Purchased ${purchaseQuantity} of ${name}`);
  };

  return (
    <div className="card shadow-xl bg-white border p-4 rounded-lg">
      <figure>
        <img src={image} alt={name} className="rounded-t-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Available: {quantity}</p>
        
        {/* Display Purchase Options */}
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1"
            max={quantity}
            value={purchaseQuantity}
            onChange={handleQuantityChange}
            disabled={isOutOfStock || isOwnFood}
            className="input input-bordered w-1/3"
          />
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || isOwnFood || purchaseQuantity > quantity}
            className="btn btn-primary"
          >
            {isOutOfStock ? 'Out of Stock' : isOwnFood ? 'Cannot Buy Your Own Item' : 'Purchase'}
          </button>
        </div>

        {/* Navigate to Single Food Page */}
        <div className="card-actions justify-end mt-4">
          <NavLink to={`/foods/${_id}`} className="btn btn-sm btn-primary">
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
