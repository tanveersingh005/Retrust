import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContextContext";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user/token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("retrust_user");
    const storedToken = localStorage.getItem("retrust_token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  // Persist user/token to localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("retrust_user", JSON.stringify(user));
      localStorage.setItem("retrust_token", token);
    } else {
      localStorage.removeItem("retrust_user");
      localStorage.removeItem("retrust_token");
    }
  }, [user, token]);

  // Helper to fetch user data
  const fetchUser = async (jwt) => {
    try {
      const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUser(res.data);
      setToken(jwt);
      setError(null);
      return res.data;
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        setUser(null);
        setToken(null);
        setError("Session expired. Please sign in again.");
      } else {
        setError("Failed to fetch user data.");
      }
      return null;
    }
  };

  // Sign Up
  const signUp = async (name, email, password, avatar) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        avatar,
      });
      const jwt = res.data.token;
      await fetchUser(jwt);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
      setLoading(false);
      return false;
    }
  };

  // Sign In
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const jwt = res.data.token;
      await fetchUser(jwt);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
      setLoading(false);
      return false;
    }
  };

  // Sign Out
  const signOut = () => {
    setUser(null);
    setToken(null);
    setError(null);
  };

  // Update Profile (local only for now)
  const updateProfile = (updates) => {
    setUser((prev) => {
      const newAvatar = updates.avatar
        ? updates.avatar
        : prev.avatar ||
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
      return { ...prev, ...updates, avatar: newAvatar };
    });
  };

  // Update user impact (CO2_saved, credits, productsReturned)
  const updateImpact = async (impactUpdates) => {
    if (!token) return false;
    setLoading(true);
    try {
      await axios.put(`${API_URL}/impact`, impactUpdates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh user data
      await fetchUser(token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update impact.");
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signUp,
        signOut,
        updateProfile,
        updateImpact,
        loading,
        error,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
