import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ReturnProductPage from "./pages/ReturnProductPage";
import ImpactDashboard from "./pages/ImpactDashboard";
import PartnerLocatorPage from "./pages/PartnerLocatorPage";
import MyCreditsPage from "./pages/MyCreditsPage";
import ProfileDashboard from "./pages/ProfileDashboard";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EwasteDetailPage from "./pages/EwasteDetailPage";
import CartPage from "./pages/CartPage";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import SignInSignUpModal from "./components/SignInSignUpModal";
import { useAuth } from './context/useAuth';
import LoadingSpinner from './components/LoadingSpinner';
import { CartProvider } from "./context/CartContext";
import SignupPage from './pages/SignupPage';

const AppContent = ({ showAuth, setShowAuth }) => {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      <Navbar onSignInClick={() => setShowAuth(true)} />
      <SignInSignUpModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage onSignInClick={() => setShowAuth(true)} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/return" element={<ReturnProductPage />} />
        <Route path="/impact" element={<ImpactDashboard />} />
        <Route path="/partners" element={<PartnerLocatorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/credits" element={<MyCreditsPage />} />
        <Route path="/profile/*" element={<ProfileDashboard />} />
        <Route path="/ewaste/:id" element={<EwasteDetailPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent showAuth={showAuth} setShowAuth={setShowAuth} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;