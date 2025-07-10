import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';

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

  if (!open) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-xl p-8 min-w-[340px] relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <div className="flex flex-col items-center mb-4">
          <span className="text-xl font-bold mb-2">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
          <button
            className="text-blue-500 text-sm hover:underline"
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setLocalError(''); }}
          >
            {mode === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {(localError || contextError) && <div className="text-red-500 text-sm">{localError || contextError}</div>}
          {loading && <div className="text-blue-500 text-sm">Loading...</div>}
          <button
            type="submit"
            className="mt-2 px-4 py-2 rounded bg-[#2196f3] text-white font-semibold hover:bg-[#1769aa] transition-colors"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInSignUpModal; 