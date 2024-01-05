import React, { useState } from 'react';
import LandingPage from '../components/LandingPage';

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LandingPage mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
  );
}
