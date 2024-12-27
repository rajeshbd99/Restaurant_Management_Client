import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Circles } from 'react-loader-spinner';

const MyOrdersPage = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [orders, setOrders] = useState([]); // State to store user orders
  const [loading, setLoading] = useState(false); // Loading state for spinner

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) {
        toast.error('User is not logged in.');
        return;
      }

      setLoading(true); // Start spinner
      try {
        const response = await axios.get(`https://restaurants-server-theta.vercel.app/my-orders?email=${user.email}`);
        setOrders(response.data); // Only logged-in user's orders
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
      } finally {
        setLoading(false); // Stop spinner
      }
    };

    fetchOrders();
  }, [user]);

  // Handle delete order
  const handleDelete = async (orderId) => {
    setLoading(true); // Start spinner for delete action
    try {
      const response = await axios.delete(`https://restaurants-server-theta.vercel.app/orders/${orderId}`);
      if (response.status === 200) {
        setOrders((prevOrders) => {
          const updatedOrders = prevOrders.filter(order => order._id !== orderId);
          toast.success('Order deleted successfully!'); // Trigger toast after filtering
          return updatedOrders; // Update state
        });
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="my-orders-page p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {/* Spinner during loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Price</th>
                <th>Food Owner</th>
                <th>Buying Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={order.foodImage}
                      alt={order.foodName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td>{order.foodName}</td>
                  <td>${order.price}</td>
                  <td>{order.foodOwner}</td>
                  <td>{moment(order.buyingDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;
