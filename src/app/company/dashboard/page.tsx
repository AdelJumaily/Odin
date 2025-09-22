import React from 'react';
import { Hero } from '@company/pages/components/Hero';
import { Navbar } from '@company/pages/components/Navbar';

export default function CompanyDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
    </div>
  );
}
