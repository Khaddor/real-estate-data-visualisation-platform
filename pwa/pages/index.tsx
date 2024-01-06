import React, { useEffect, useState } from 'react';
import LandingPage from '../components/LandingPage';

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    return () => {
      document.title = 'Landing Page';
    };
  }, []);
  return (
    <LandingPage mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
  );
}
