import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

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
        </div>
        {/* User Profile / Sign In */}
        {!user ? (
          <button
            className="ml-4 px-5 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors duration-200 shadow"
            onClick={onSignInClick}
          >
            Sign In
          </button>
        ) : (
          <div className="relative ml-4 group">
            <button className="w-11 h-11 rounded-full border-2 border-green-200 flex items-center justify-center focus:outline-none focus:ring">
              <img
                src={user.avatar}
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
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
