import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';

const initialForm = { name: '', email: '', password: '' };

const SignInSignUpModal = ({ open, onClose }) => {
  const { signIn, signUp, error: contextError, loading } = useAuth();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(initialForm);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (open) {
      setMode('signin');
      setForm(initialForm);
      setLocalError('');
    }
  }, [open]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLocalError('');
    if (mode === 'signin') {
      if (!form.email || !form.password) return setLocalError('Please enter email and password.');
      const success = await signIn(form.email, form.password);
      if (!success) return setLocalError(contextError || 'Login failed.');
      onClose();
    } else {
      if (!form.name || !form.email || !form.password) return setLocalError('Please fill all fields.');
      const success = await signUp(form.name, form.email, form.password);
      if (!success) return setLocalError(contextError || 'Registration failed.');
      onClose();
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
    setLocalError('');
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 overflow-hidden z-10"
          >
            {/* Background design elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
              </h3>
              <p className="text-sm text-slate-500 mt-1.5">
                {mode === 'signin' ? 'Access your eco-credits and order status' : 'Join ReTrust+ and start earning credits'}
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <AnimatePresence mode="popLayout">
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                    <input
                      name="name"
                      type="text"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 focus:bg-white text-sm transition-all"
                />
              </div>

              {/* Error messages */}
              <AnimatePresence>
                {(localError || contextError) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 p-3.5 rounded-2xl"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{localError || contextError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-teal-650 hover:bg-teal-700 active:bg-teal-850 text-white font-semibold text-sm transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-teal-700/10 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Sign Up'
                )}
              </button>
            </form>

            {/* Mode Switcher */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={toggleMode}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline transition duration-200"
              >
                {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignInSignUpModal;