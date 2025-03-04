import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const RealWeddingStories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/wedding-stories')
      .then(response => {
        setStories(response.data);
      })
      .catch(error => {
        console.error('Error fetching wedding stories:', error);
      });
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Real Wedding Stories</h2>
          <Link
            to="/stories"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Stories
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <img
                  src={story.image}
                  alt={story.couple}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{story.couple}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{story.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{story.story.substring(0, 100)}...</p>
                <Link
                  to={`/story/${story.id}`}
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <span>Read Their Story</span>
                  <Heart className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealWeddingStories;
