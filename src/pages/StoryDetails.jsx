import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import axios from 'axios';

export const StoryDetails = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wedding-stories/${id}`);
        setStory(response.data);
      } catch (err) {
        setError('Story not found!');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) return <p className="text-center mt-16 text-2xl font-bold">Loading...</p>;
  if (error) return <p className="text-center mt-16 text-2xl font-bold">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            {story.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={story.couple}
                className={`w-full object-cover rounded-lg ${index === 0 ? 'h-96 col-span-2' : 'h-48'}`}
              />
            ))}
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900">{story.couple}</h1>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>{story.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(story.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 hover:text-purple-600"
                >
                  {story.location}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Their Story</h2>
              <p className="text-gray-600 whitespace-pre-line">{story.story}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Wedding Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Venue</h3>
                  <p className="text-gray-600">{story.venue}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Vendors</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Photography: {story.vendors?.photographer}</li>
                    <li>Decoration: {story.vendors?.decorator}</li>
                    <li>Makeup: {story.vendors?.makeup}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryDetails;
