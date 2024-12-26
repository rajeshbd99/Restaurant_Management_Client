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
    <div className="card shadow-lg bg-white border p-4 rounded-lg">
      <figure>
        <img src={image} alt={name} className="rounded-t-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Price: ${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</p>
        <p>Available: {quantity}</p>

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
            {isOutOfStock ? 'Out of Stock' : isOwnFood ? 'Cannot Buy' : 'Purchase'}
          </button>
        </div>

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
