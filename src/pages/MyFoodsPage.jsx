import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'; // Using react-loader-spinner

const MyFoodsPage = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Fetch foods added by the logged-in user
  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    fetch(`https://restaurants-server-theta.vercel.app/foods?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching user foods:', error);
        setLoading(false); // Ensure loading is false even on error
      });
  }, [user.email]);

  const handleUpdate = (food) => {
    setSelectedFood(food); // Open modal with selected food
  };

  const handleSave = () => {
    fetch(`https://restaurants-server-theta.vercel.app/foods/${selectedFood._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success('Food updated successfully!');
          setSelectedFood(null);
          setLoading(true); // Show loading when refreshing data
          fetch(`https://restaurants-server-theta.vercel.app/foods?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => setFoods(data))
            .finally(() => setLoading(false));
        } else {
          toast.error('Error updating food.');
        }
      })
      .catch((error) => console.error('Error updating food:', error));
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">My Foods</h1>

      {/* Show Spinner when loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foods.map((food) => (
            <div key={food._id} className="card">
              <img src={food.img} alt={food.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{food.name}</h2>
                <p>Price: ${food.price}</p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => handleUpdate(food)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {selectedFood && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Food</h3>
            <form>
              <label className="block">
                Name:
                <input
                  type="text"
                  value={selectedFood.name}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, name: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                Price:
                <input
                  type="number"
                  value={selectedFood.price}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, price: +e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </label>
              <label className="block">
                Image URL:
                <input
                  type="text"
                  value={selectedFood.img}
                  onChange={(e) =>
                    setSelectedFood({ ...selectedFood, img: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </label>
              <div className="modal-action">
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedFood(null)}
                >
                  Cancel
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
