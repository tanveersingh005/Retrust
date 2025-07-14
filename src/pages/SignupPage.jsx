import React, { useState } from 'react';
import SignInSignUpModal from '../components/SignInSignUpModal';

const SignupPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="pt-24">
      <SignInSignUpModal open={open} onClose={() => setOpen(false)} defaultTab="signup" />
    </div>
  );
};

export default SignupPage; 