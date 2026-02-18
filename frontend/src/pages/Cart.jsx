import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';

export default function Cart() {
  const { cartItems, cartTotal, updateCartItem, removeFromCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemove = async (itemId) => {
    if (!confirm('Are you sure you want to remove this item?')) return;
    try {
      await removeFromCart(itemId);
    } catch (error) {
      alert(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200"></div>
        <div className="text-center relative z-10">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-dark-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Login to View Cart</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Please login to view your shopping cart</p>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-200"></div>
        <div className="text-center relative z-10">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-dark-300 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start shopping to add items to your cart</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-100 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="card-elevated p-6">
                <div className="flex gap-4">
                  {/* Image */}
                  <Link to={`/products/${item.product_id}`} className="w-28 h-28 flex-shrink-0">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop'}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link to={`/products/${item.product_id}`} className="font-semibold text-lg text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {formatPrice(item.price)} each
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 dark:border-dark-400 rounded-xl">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400 rounded-l-xl transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-14 text-center border-none outline-none bg-transparent dark:text-white font-medium"
                          min="1"
                          max={item.stock}
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400 rounded-r-xl transition-colors disabled:opacity-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="font-bold text-xl text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card-elevated p-6 sticky top-24">
              <h2 className="text-lg font-display font-semibold mb-4 dark:text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-600 dark:text-green-400">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t dark:border-dark-400 pt-4 mb-6">
                <div className="flex justify-between font-bold text-xl">
                  <span className="dark:text-white">Total</span>
                  <span className="bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full btn btn-primary shadow-glow hover:shadow-glow-lg"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium dark:text-primary-400"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

