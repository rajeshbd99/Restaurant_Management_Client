import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyFoodsPage = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [myFoods, setMyFoods] = useState([]); // State for user's food items
  const [selectedFood, setSelectedFood] = useState(null); // Food item to be updated
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch user's food items
  useEffect(() => {
    const fetchMyFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/foods?email=${user.email}`);
        setMyFoods(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchMyFoods();
  }, [user.email]);

  // Handle update button click
  const handleUpdateClick = (food) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  // Handle form submission to update food item
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/foods/${selectedFood._id}`, selectedFood);
      toast.success('Food item updated successfully!');
      setShowModal(false);

      // Refresh the food items list
      const updatedFoods = myFoods.map((food) =>
        food._id === selectedFood._id ? selectedFood : food
      );
      setMyFoods(updatedFoods);
    } catch (error) {
      console.error('Error updating food item:', error);
      toast.error('Failed to update food item.');
    }
  };

  return (
    <div className="my-foods-page p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Foods</h1>

      {/* Table to display food items */}
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Price</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myFoods.map((food) => (
            <tr key={food._id} className="border-t">
              <td className="p-4">
                <img src={food.image} alt={food.name} className="w-16 h-16 rounded-lg" />
              </td>
              <td className="p-4">{food.name}</td>
              <td className="p-4">${food.price}</td>
              <td className="p-4">
                <button
                  className="btn btn-primary btn-sm flex items-center gap-2"
                  onClick={() => handleUpdateClick(food)}
                >
                  <FaEdit /> Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Update Food Item</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={selectedFood.name}
                  onChange={(e) => setSelectedFood({ ...selectedFood, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Price</label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={selectedFood.price}
                  onChange={(e) => setSelectedFood({ ...selectedFood, price: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={selectedFood.image}
                  onChange={(e) => setSelectedFood({ ...selectedFood, image: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoodsPage;
