import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';
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
          image: item.img.startsWith('http') ? item.img : window.location.origin + '/' + item.img.replace(/^\.*\/?/, ''),
        })),
        total,
        images: cart.map(item => item.img.startsWith('http') ? item.img : window.location.origin + '/' + item.img.replace(/^\.*\/?/, '')),
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      clearCart();
      await fetchUser(token);
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
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full pt-28 pb-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-12 text-center shadow-sm max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-tight">Your cart is empty</h2>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-2 max-w-xs leading-relaxed mb-8">
              Looks like you haven't added any refurbished premium products to your cart yet.
            </p>
            <button
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold rounded-2xl shadow-md transition duration-200 cursor-pointer"
              onClick={() => navigate('/shop')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div
                  key={item.id || item.name}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                        {item.price} credits / item
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0">
                    {/* Qty controller */}
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
                        onClick={() => updateQty(item.id || item.name, Math.max(1, item.qty - 1))}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-bold text-slate-800 dark:text-white text-sm w-5 text-center">{item.qty}</span>
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all"
                        onClick={() => updateQty(item.id || item.name, item.qty + 1)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block font-semibold">Subtotal</span>
                        <span className="font-bold text-slate-800 dark:text-white text-sm sm:text-base">
                          {item.price * item.qty} cr
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id || item.name)}
                        className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-100 dark:hover:border-rose-900/40 transition-all duration-200 shrink-0"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-350 transition duration-200 px-1 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
            </div>

            {/* Checkout Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Order Summary</h2>

              {/* Credits Balance Indicator */}
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Your Credit Balance</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{user?.credits || 0} cr</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">Order Cost</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{total} cr</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-2.5 flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Remaining Balance</span>
                  <span className={`text-sm font-bold ${enoughCredits ? 'text-teal-600 dark:text-teal-400' : 'text-rose-600 dark:text-rose-450'}`}>
                    {enoughCredits ? `${(user?.credits || 0) - total} cr` : 'Insufficient credits'}
                  </span>
                </div>
              </div>

              {/* Price calculations */}
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{total} credits</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Carbon Offset</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-450">Calculated at checkout</span>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3.5 flex justify-between text-base font-bold text-slate-900 dark:text-white">
                  <span>Grand Total</span>
                  <span>{total} credits</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all duration-250 flex items-center justify-center gap-2 cursor-pointer ${
                  enoughCredits
                    ? 'bg-teal-600 hover:bg-teal-700 active:scale-95 text-white shadow-teal-600/10'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                }`}
                disabled={!enoughCredits}
                onClick={handleCheckout}
              >
                <CreditCard className="w-4 h-4" />
                <span>Place Order</span>
              </button>

              {!enoughCredits && (
                <p className="text-[11px] text-center font-medium text-rose-500 dark:text-rose-400 leading-normal bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl p-3">
                  You do not have enough credits in your wallet. Return recyclable electronics to earn credits!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CartPage;