// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Go back to Home</Link>
    </div>
  );
};

