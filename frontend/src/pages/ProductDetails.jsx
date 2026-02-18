import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, getCategoryIcon } from '../utils/helpers';

const API_URL = '/api';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProduct(data.product);
      } else {
        setError(data.error || 'Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAdding(true);
    setError('');
    try {
      await addToCart(product.id, quantity);
      alert('Added to cart!');
    } catch (error) {
      setError(error.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400"></div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
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
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400">Products</Link></li>
            <li>/</li>
            <li><Link to={`/products?category=${product.category}`} className="hover:text-primary-600 dark:hover:text-primary-400">{product.category}</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow-sm overflow-hidden">
            <img
              src={product.image || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white dark:bg-dark-300 rounded-xl shadow-sm p-8">
            <div className="flex items-start gap-3 mb-4">
              <span className="badge bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                {getCategoryIcon(product.category)} {product.category}
              </span>
              <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-error'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              {formatPrice(product.price)}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {product.description}
            </p>

            {/* Stock Info */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                <span className="font-medium text-gray-900 dark:text-white">{product.stock} units available</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 dark:border-dark-400 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-16 text-center border-none outline-none bg-transparent dark:text-white"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-400 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-400">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product Details</h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">SKU</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">MH-{product.id.toString().padStart(5, '0')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

