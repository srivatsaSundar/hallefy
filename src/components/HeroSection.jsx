import React from 'react';
import { MapPin } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div
      className="h-[60vh] bg-cover bg-center relative top-0 left-0 right-0"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80)',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="absolute top-20 right-4 bg-white text-purple-600 px-4 py-2 rounded shadow hover:shadow-lg transition-shadow flex items-center">
        <a
          href="https://www.google.com/maps/place/Coimbatore/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2"
        >
          <MapPin className="text-purple-600 w-5 h-5" />
          <span>Coimbatore</span>
        </a>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Find Your Perfect Wedding Venue
        </h1>
        <p className="text-xl text-center mb-8">
          Discover and book the best marriage halls in your city
        </p>
      </div>
    </div>
  );
};
export default HeroSection;