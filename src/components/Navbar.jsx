import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, Leaf, ChevronDown, User, CreditCard, Settings, Recycle, Package, LogOut, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showEcoToast, setShowEcoToast] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      setShowEcoToast(true);
      const timer = setTimeout(() => setShowEcoToast(false), 3800);
      return () => clearTimeout(timer);
    }
  }, [theme]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const unreadCount = user?.notifications?.filter(n => !n.read).length || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg shadow-teal-900/5 border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-teal-400/40 transition-all duration-300">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Re<span className="text-teal-600">Trust</span><span className="text-emerald-500">+</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-teal-700 bg-teal-50'
                      : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-teal-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
                title="Toggle Theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5 text-amber-400 animate-pulse" />
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                {user && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {!user ? (
                <button
                  onClick={onSignInClick}
                  className="ml-2 px-5 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-teal-400/30"
                >
                  Sign In
                </button>
              ) : (
                <div className="relative ml-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 pr-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 bg-white dark:bg-slate-900 hover:bg-teal-50 dark:hover:bg-teal-950/20 text-slate-700 dark:text-slate-300 transition-all duration-200"
                  >
                    <img
                      src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">{user.name}</span>
                    {unreadCount > 0 && (
                      <span className="w-2 h-2 bg-teal-500 rounded-full" />
                    )}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-teal-50/80 to-emerald-50/80 dark:from-teal-950/30 dark:to-emerald-950/30">
                          <div className="font-semibold text-slate-900 dark:text-white text-sm">{user.name}</div>
                          <div className="text-xs text-teal-600 dark:text-teal-400">{user.email}</div>
                        </div>
                        <div className="py-1">
                          {[
                            { icon: User, label: 'Profile', path: '/profile' },
                            { icon: CreditCard, label: 'My Credits', path: '/profile/credits' },
                            { icon: Settings, label: 'Edit Profile', path: '/profile/edit' },
                            { icon: Recycle, label: 'E-Tracking', path: '/profile/ewaste' },
                            { icon: Package, label: 'Order History', path: '/profile/orders' },
                          ].map(({ icon: Icon, label, path }) => (
                            <Link
                              key={label}
                              to={path}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-teal-950/20 hover:text-teal-700 dark:hover:text-teal-450 transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <Icon className="w-4 h-4" />
                              {label}
                            </Link>
                          ))}
                          {unreadCount > 0 && (
                            <Link
                              to="/profile/notifications"
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/20 transition-colors"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <Bell className="w-4 h-4" />
                              Notifications
                              <span className="ml-auto text-xs font-bold bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">{unreadCount}</span>
                            </Link>
                          )}
                          <button
                            onClick={() => { signOut(); setDropdownOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50 transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-lg text-slate-900 dark:text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Re<span className="text-teal-600">Trust</span><span className="text-emerald-500">+</span>
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User info */}
          {user && (
            <div className="px-5 py-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <img src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt={user.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white">{user.name}</div>
                <div className="text-xs text-teal-600 dark:text-teal-400">{user.email}</div>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40'
                    : 'text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user && (
              <>
                <div className="pt-3 pb-1 px-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Account</div>
                {[
                  { label: 'Profile', path: '/profile' },
                  { label: 'My Credits', path: '/profile/credits' },
                  { label: 'E-Tracking', path: '/profile/ewaste' },
                  { label: 'Order History', path: '/profile/orders' },
                ].map(({ label, path }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}

                <button
                  onClick={() => navigate('/cart')}
                  className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartCount > 0 && <span className="ml-auto text-xs font-bold bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                </button>
              </>
            )}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Eco-Theme</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-850 transition duration-200 cursor-pointer"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            {!user ? (
              <button
                onClick={() => { onSignInClick(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-semibold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Eco-Toast */}
      <AnimatePresence>
        {showEcoToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md text-white border border-emerald-500/20 rounded-2xl p-4 shadow-xl max-w-sm flex items-start gap-3.5"
          >
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
              <Leaf className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-slate-100 font-sans">Eco-Dark Mode Active</h5>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
                Reduces OLED screen battery draw, saving approx. <span className="text-emerald-400 font-semibold">0.05g CO₂ per minute</span> of screen time.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
