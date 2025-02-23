import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Heart, User, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar = () => {
  const user = useStore((state) => state.user);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">WeddingVenue</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
            >
              Venues
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
            >
              About
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist">
              <Heart className="h-6 w-6 text-gray-700 hover:text-purple-600" />
            </Link>
            {user ? (
              <Link to="/profile">
                <User className="h-6 w-6 text-gray-700 hover:text-purple-600" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
              >
                Login
              </Link>
            )}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
export default Navbar;