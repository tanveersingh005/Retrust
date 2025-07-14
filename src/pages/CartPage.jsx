import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CartPage = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const { user, fetchUser, token } = useAuth();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const enoughCredits = (user?.credits || 0) >= total;

  const handleCheckout = async () => {
    if (!enoughCredits) return;
    try {
      // Prepare order data
      const orderData = {
        items: cart.map(item => ({
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.img,
        })),
        total,
        images: cart.map(item => item.img),
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearCart();
      await fetchUser();
      toast.success('Purchase successful! Your credits have been deducted.', {
        position: 'top-center',
        autoClose: 3000,
        icon: '🛒',
      });
      setTimeout(() => navigate('/shop'), 1200);
    } catch (err) {
      alert('Failed to place order. ' + (err?.response?.data?.message || err.message || 'Please try again.'));
    }
  };

  return (
    <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <FaShoppingCart className="text-6xl text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your Cart</h2>
            <p className="text-lg text-gray-600 mb-8">Your cart is empty.</p>
            <button
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow p-6 mb-8">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600 bg-gray-50">
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id || item.name} className="border-t">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-xl border bg-gray-50" />
                      <span className="font-semibold">{item.name}</span>
                    </td>
                    <td className="px-4 py-3">{item.price} credits</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-300" onClick={() => updateQty(item.id || item.name, Math.max(1, item.qty - 1))}>-</button>
                        <span className="font-semibold text-lg">{item.qty}</span>
                        <button className="px-2 py-1 rounded bg-gray-200 text-gray-700 font-bold text-lg hover:bg-gray-300" onClick={() => updateQty(item.id || item.name, item.qty + 1)}>+</button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold">{item.price * item.qty} credits</td>
                    <td className="px-4 py-3">
                      <button className="text-red-600 hover:underline" onClick={() => removeFromCart(item.id || item.name)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <div className="text-xl font-bold">Total: {total} credits</div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className={`px-6 py-3 rounded-lg font-bold text-lg shadow transition-colors ${enoughCredits ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={!enoughCredits}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            {!enoughCredits && (
              <div className="text-red-600 font-semibold mt-2 text-right">Not enough credits to complete purchase.</div>
            )}
          </div>
        )}
        {cart.length > 0 && (
          <button className="mt-4 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition-colors" onClick={() => navigate('/shop')}>
            Continue Shopping
          </button>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CartPage; 