import { NavLink } from 'react-router-dom';

const TopFoodCard = ({ food }) => {
  const { name, image, price, purchaseCount, _id } = food;

  return (
    <div className="card bg-white shadow-xl hover:shadow-2xl border">
      <figure>
        <img src={image} alt={name} className="rounded-t-lg" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Purchases: {purchaseCount}</p>
        <div className="card-actions justify-end">
          <NavLink to={`/foods/${_id}`} className="btn btn-sm btn-primary">
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TopFoodCard;
