import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { SearchFilters } from '../components/SearchFilters';
import { HallCard } from '../components/HallCard';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { filteredVenues = [] } = location.state || {};

  const handleNavigation = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="container mx-auto px-4">
        <SearchFilters />
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Available Venues</h3>
          {filteredVenues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <HallCard key={venue.id} hall={venue} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium text-lg mb-4">
                No venues found matching your criteria.
              </p>
              <button
                onClick={handleNavigation}
                className="bg-transparent text-black px-6 py-3 rounded-md "
              >
                Browse Our Website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;