import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import venues from '../components/venueData';

export const SearchFiltershome = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const results = venues.filter((venue) => {
      const matchesSearch = search
        ? venue.location.toLowerCase().includes(search.toLowerCase()) ||
        venue.name.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesSearch;
    });

    navigate('/search', { state: { filteredVenues: results } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto -mt-12 relative z-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Venue Name or Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              style={{ maxWidth: '800px' }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="w-32 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Search
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
export default SearchFiltershome;