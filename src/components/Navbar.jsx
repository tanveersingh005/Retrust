import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const navLinks = [
  { name: "Shop", path: "/shop" },
  { name: "Return", path: "/return" },
  { name: "Impact", path: "/impact" },
  { name: "Partners", path: "/partners" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = ({ onSignInClick }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-100 fixed top-0 left-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-2xl text-gray-700 hover:text-green-700"
        >
          {/* <span className="inline-block w-7 h-7 bg-green-600 rounded-md" /> */}
          ReTrust+
        </Link>
        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-2 py-1 text-gray-700 font-medium hover:text-green-700 transition-colors duration-200
      ${location.pathname.startsWith(link.path) ? "text-green-700" : ""}
    `}
            >
              {link.name}
              {location.pathname.startsWith(link.path) && (
                <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-green-600 rounded-full"></span>
              )}
            </Link>
          ))}
          {/* Cart Icon - always show, badge only if signed in */}
          <button
            className="relative ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/cart')}
          >
            <FaShoppingCart className="w-6 h-6 text-gray-700" />
            {user && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
        {/* User Profile / Sign In - Desktop */}
        {!user ? (
          <button
            className="hidden md:block ml-4 px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow"
            onClick={onSignInClick}
          >
            Sign In
          </button>
        ) : (
          <div className="hidden md:block relative ml-4 group">
            <button className="w-11 h-11 rounded-full border-2 border-green-200 flex items-center justify-center focus:outline-none focus:ring">
              <img
                src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg py-2 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition">
              <div className="px-4 py-2 text-gray-900 font-semibold border-b">
                {user.name}
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Profile
              </Link>
              <Link
                to="/profile/credits"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                My Credits
              </Link>
              <Link
                to="/profile/edit"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Edit Profile
              </Link>
              <Link
                to="/profile/ewaste"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                E-Tracking
              </Link>
              <Link
                to="/profile/orders"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Order History
              </Link>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {/* User Profile - Mobile */}
            {user && (
              <div className="flex flex-col items-center py-4 border-b border-gray-200 mb-2">
                <img
                  src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-200 shadow mb-2"
                />
                <span className="font-semibold text-gray-900 text-lg">{user.name}</span>
              </div>
            )}
            {/* Navigation Links - Mobile */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                  ${location.pathname.startsWith(link.path) 
                    ? "text-green-700 bg-green-50" 
                    : "text-gray-700 hover:text-green-700 hover:bg-gray-50"
                  }
                `}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {/* Divider */}
            <div className="border-t border-gray-200 my-2"></div>
            {/* User Actions - Mobile */}
            {!user ? (
              <button
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  onSignInClick();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
            ) : (
              <>
                <div className="px-3 py-2 text-gray-900 font-semibold border-b border-gray-100">
                  {user.name}
                </div>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/profile/credits"
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Credits
                </Link>
                <Link
                  to="/profile/edit"
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Edit Profile
                </Link>
                <Link
                  to="/profile/ewaste"
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  E-Tracking
                </Link>
                <Link
                  to="/profile/orders"
                  className="block px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Order History
                </Link>
                <button
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
