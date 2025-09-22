import React from 'react';
import { redirect } from 'next/navigation';

export default function ValkyrieProductPage() {
  // Redirect to the Valkyrie application
  redirect('/products/valkyrie/app');
}
