import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, getCategoryIcon } from '../utils/helpers';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      setIsAdding(true);
      await addToCart(product.id);
      setIsAdding(false);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 2000);
    } catch (error) {
      alert(error.message);
      setIsAdding(false);
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="card-elevated group block overflow-hidden">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-dark-200 relative">
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop'} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-white/90 dark:bg-dark-100/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-full shadow-soft">
            {getCategoryIcon(product.category)} {product.category}
          </span>
        </div>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-white text-sm font-medium">View Details</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-lg">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            product.stock > 0 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            showAdded
              ? 'bg-green-500 text-white'
              : product.stock === 0
                ? 'bg-gray-200 dark:bg-dark-400 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:shadow-glow hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {showAdded ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added!
            </>
          ) : isAdding ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </div>
    </Link>
  );
}

