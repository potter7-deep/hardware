import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getCategoryIcon } from '../utils/helpers';

const API_URL = '/api';

const categories = [
  { name: 'Building Materials', icon: '🏗️', color: 'from-amber-500 to-orange-600' },
  { name: 'Power Tools', icon: '🔧', color: 'from-blue-500 to-cyan-600' },
  { name: 'Hand Tools', icon: '🔨', color: 'from-purple-500 to-pink-600' },
  { name: 'Electrical', icon: '💡', color: 'from-yellow-500 to-amber-600' },
  { name: 'Plumbing', icon: '🚿', color: 'from-cyan-500 to-blue-600' },
  { name: 'Paint', icon: '🎨', color: 'from-red-500 to-rose-600' }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/products/featured`);
        const data = await res.json();
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-100 via-primary-900 to-dark-100"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        
        <div className="container-custom relative z-10 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">Quality Hardware Products in Kenya</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white leading-tight animate-slide-up">
              Build Your Vision with{' '}
              <span className="text-gradient-light bg-gradient-to-r from-primary-400 to-primary-300">
                Quality Tools
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-slide-up stagger-1">
              Your trusted partner for building materials, tools, and hardware supplies. 
              Premium quality products at competitive prices delivered across Kenya.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up stagger-2">
              <Link to="/products" className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg shadow-glow hover:shadow-glow-lg transform hover:scale-105 transition-all">
                Shop Now
              </Link>
              <Link to="/products?category=Building%20Materials" className="btn border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg">
                Building Materials
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10 animate-fade-in stagger-3">
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-gray-400 text-sm">Products</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="text-gray-400 text-sm">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">5+</p>
                <p className="text-gray-400 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-dark-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our wide range of hardware categories to find exactly what you need for your project
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="card-elevated p-6 text-center group hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-200">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Handpicked selection of our most popular items
              </p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold group">
              View All Products
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-elevated p-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 dark:bg-dark-400 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-dark-400 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-dark-400 rounded w-3/4 mb-2"></div>
                  <div className="h-5 bg-gray-200 dark:bg-dark-400 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-elevated p-8 text-center group hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 dark:text-white">Quality Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-400">All products meet Kenya Bureau of Standards (KEBS) requirements for your peace of mind</p>
            </div>
            
            <div className="card-elevated p-8 text-center group hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 dark:text-white">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick and reliable delivery across Nairobi and all of Kenya</p>
            </div>
            
            <div className="card-elevated p-8 text-center group hover:-translate-y-1 transition-all duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 dark:text-white">Expert Support</h3>
              <p className="text-gray-600 dark:text-gray-400">24/7 customer support from hardware experts ready to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of hardware supplies and find everything you need
          </p>
          <Link to="/products" className="btn bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  );
}

