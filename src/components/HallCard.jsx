import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HallCard = ({ hall }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img
          src={hall.images[0]}
          alt={hall.name}
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
        >
          <Heart className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{hall.name}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <MapPin className="h-4 w-4 text-gray-500" />
          <a
            href={`https://www.google.com/maps?q=${encodeURIComponent(
              hall.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-purple-600"
            style={{ textDecoration: 'none' }}
          >
            {hall.location}
          </a>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Up to {hall.capacity} guests
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">{hall.rating}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/venue/${hall.id}`}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
          >
            <span>View More</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default HallCard;