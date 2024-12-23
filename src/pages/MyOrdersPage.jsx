import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

const MyOrdersPage = () => {
  const { user } = useContext(AuthContext); // Get logged-in user info
  const [orders, setOrders] = useState([]); // State to store user orders

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders?email=${user?.email}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
      }
    };

    if (user) fetchOrders();
  }, [user]);

  // Handle delete order
  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(`/api/orders/${orderId}`);
      if (response.status === 200) {
        setOrders(orders.filter(order => order._id !== orderId)); // Remove deleted order from state
        toast.success('Order deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order.');
    }
  };

  return (
    <div className="my-orders-page p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      {orders.length > 0 ? (
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
