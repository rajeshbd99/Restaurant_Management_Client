import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddFoodPage = () => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [foodData, setFoodData] = useState({
    name: '',
    image: '',
    category: '',
    quantity: '',
    price: '',
    addedBy: {
      name: user?.displayName || '',
      email: user?.email || '',
    },
    origin: '',
    description: '',
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({ ...foodData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/foods', foodData);
      if (response.status === 201) {
        toast.success('Food item added successfully!');
        setFoodData({
          name: '',
          image: '',
          category: '',
          quantity: '',
          price: '',
          addedBy: {
            name: user?.displayName || '',
            email: user?.email || '',
          },
          origin: '',
          description: '',
        });
      }
    } catch (error) {
      console.error('Error adding food item:', error);
      toast.error('Failed to add food item.');
    }
  };

  return (
    <div className="add-food-page p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Food</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        {/* Food Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Name</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Image URL</label>
          <input
            type="text"
            name="image"
            value={foodData.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Food Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Category</label>
          <input
            type="text"
            name="category"
            value={foodData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={foodData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
          <input
            type="number"
            name="price"
            value={foodData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            min="0"
            required
          />
        </div>

        {/* Food Origin */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Food Origin (Country)</label>
          <input
            type="text"
            name="origin"
            value={foodData.origin}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={foodData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Added By (Name & Email) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Added By</label>
          <input
            type="text"
            value={`${foodData.addedBy.name} (${foodData.addedBy.email})`}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodPage;
