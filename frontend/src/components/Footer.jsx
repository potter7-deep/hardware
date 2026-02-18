import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-gray-300 bg-gradient-to-b from-gray-900 to-dark-100">
      {/* Main Footer */}
      <div className="py-16 container-custom">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-glow">
                <span className="text-xl font-bold text-white">M</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white font-display">Modern</span>
                <span className="block text-xs text-gray-400 font-display">Hardware</span>
              </div>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Your trusted partner for quality hardware products in Kenya. 
              Building the future, one tool at a time since 2020.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-dark-300 hover:bg-primary-600 group" aria-label="Facebook">
                <svg className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-dark-300 hover:bg-primary-600 group" aria-label="Twitter">
                <svg className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.32,6.44a.5.5,0,0,0-.2-.87l-.79-.2A.5.5,0,0,1,22,4.67l.44-.89a.5.5,0,0,0-.58-.7l-2,.56a.5.5,0,0,1-.44-.08,5,5,0,0,0-3-1,5,5,0,0,0-5,5v.36a.25.25,0,0,1-.22.25c-2.81.33-5.5-1.1-8.4-4.44a.51.51,0,0,0-.51-.15A.5.5,0,0,0,2,4a7.58,7.58,0,0,0,.46,4.92.25.25,0,0,1-.26.36L1.08,9.06a.5.5,0,0,0-.57.59,5.15,5.15,0,0,0,2.37,3.78.25.25,0,0,1,0,.45l-.53.21a.5.5,0,0,0-.26.69,4.36,4.36,0,0,0,3.2,2.48.25.25,0,0,1,0,.47A10.94,10.94,0,0,1,1,18.56a.5.5,0,0,0-.2,1,20.06,20.06,0,0,0,8.14,1.93,12.58,12.58,0,0,0,7-2A12.5,12.5,0,0,0,21.5,9.06V8.19a.5.5,0,0,1,.18-.38Z"/>
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-dark-300 hover:bg-primary-600 group" aria-label="Instagram">
                <svg className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.35.2-6.78,2.62-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.36,2.62,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.35-.2,6.78-2.62,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
                </svg>
              </a>
              <a href="#" className="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-lg bg-dark-300 hover:bg-primary-600 group" aria-label="LinkedIn">
                <svg className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5,2h-17A1.5,1.5,0,0,0,2,3.5v17A1.5,1.5,0,0,0,3.5,22h17a1.5,1.5,0,0,0,1.5-1.5v-17A1.5,1.5,0,0,0,20.5,2ZM8,19H5V9h3Zm6,0H11V13c0-1.66,1-2,2-2s2,1,2,2v6H13v-6c0-1.66,1-2,2-2s2,1,2,2v6h-3V19ZM4,6.5A1.5,1.5,0,1,1,5.5,8,1.5,1.5,0,0,1,4,6.5Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white font-display">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400 group">
                  <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400 group">
                  <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/account" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400 group">
                  <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400 group">
                  <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white font-display">Categories</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 transition-colors cursor-pointer hover:text-primary-400 group">
                <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Building Materials
              </li>
              <li className="flex items-center gap-2 text-gray-400 transition-colors cursor-pointer hover:text-primary-400 group">
                <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Power Tools
              </li>
              <li className="flex items-center gap-2 text-gray-400 transition-colors cursor-pointer hover:text-primary-400 group">
                <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Hand Tools
              </li>
              <li className="flex items-center gap-2 text-gray-400 transition-colors cursor-pointer hover:text-primary-400 group">
                <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Electrical
              </li>
              <li className="flex items-center gap-2 text-gray-400 transition-colors cursor-pointer hover:text-primary-400 group">
                <svg className="w-4 h-4 transition-transform text-primary-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Plumbing
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white font-display">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-dark-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Modern Hardware Ltd</p>
                  <p className="text-sm font-medium text-white">Moi's Bridge, Kenya</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+254714740470" className="text-sm font-medium text-white transition-colors hover:text-primary-400">
                    +254 714 740 470
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-dark-300">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@modernhardware.com" className="text-sm font-medium text-white transition-colors hover:text-primary-400">
                    info@modernhardware.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-300">
        <div className="py-6 container-custom">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Modern Hardware. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="transition-colors hover:text-primary-400">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-primary-400">Terms of Service</a>
              <a href="#" className="transition-colors hover:text-primary-400">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

