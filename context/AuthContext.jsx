import React, { useState, useEffect } from 'react';

import { AuthContext } from './AuthContextContext';

const defaultUser = {
  name: 'Sophia Bennett',
  email: 'sophia.bennett@email.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  phone: '',
  address: '',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('retrust_user');
    if (stored) {
      setUser(JSON.parse(stored))
    };
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('retrust_user', JSON.stringify(user));
    else localStorage.removeItem('retrust_user');
  }, [user]);

  const signIn = () => {
    const stored = localStorage.getItem('retrust_user');
    if (stored) setUser(JSON.parse(stored));
    else setUser(defaultUser);
  };

  const signUp = (name, email) => {
    setUser({ ...defaultUser, name, email });
  };

  const signOut = () => setUser(null);

  const updateProfile = (updates) => {
    setUser((prev) => {
      const newAvatar = updates.avatar ? updates.avatar : prev.avatar;
      return { ...prev, ...updates, avatar: newAvatar };
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};