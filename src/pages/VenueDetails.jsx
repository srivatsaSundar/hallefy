import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, MapPin, Calendar, Wifi, Car, UtensilsCrossed, Music, Phone } from 'lucide-react';
import venues from './venueData';

export const VenueDetails = () => {
  const { id } = useParams();
  const venue = venues.find((v) => v.id === id);

  if (!venue) {
    return (
      <div className="pt-16 bg-gray-50 min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-800">Venue not found</h1>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            <img
              src={venue.images[0]}
              alt={venue.name}
              className="w-full h-96 object-cover rounded-lg col-span-2"
            />
            {venue.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Venue Image ${index + 2}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{venue.name}</h1>
                <div className="flex items-center space-x-2 mt-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      venue.location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {venue.location}
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Up to {venue.capacity} guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>{venue.rating} Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Available Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-purple-600" />
                <span>24/7 Support</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {amenity === 'WiFi' && <Wifi className="h-5 w-5 text-purple-600" />}
                    {amenity === 'Parking' && <Car className="h-5 w-5 text-purple-600" />}
                    {amenity === 'Catering' && <UtensilsCrossed className="h-5 w-5 text-purple-600" />}
                    {amenity === 'DJ' && <Music className="h-5 w-5 text-purple-600" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row md:space-x-8">
              <div className="md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">About this venue</h2>
                <p className="text-gray-600">{venue.description}</p>
              </div>
              <div className="md:w-1/3">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    venue.location
                  )}&output=embed`}
                  width="100%"
                  height="200"
                  className="rounded-lg border border-gray-300"
                  allowFullScreen
                  loading="lazy"
                  title="Venue Location"
                ></iframe>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              {venue.reviews.map((review) => (
                <div key={review.id} className="border-t border-gray-200 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.userName}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1">{review.rating}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const message = `Hello, I am interested in booking the venue "${venue.name}" located at ${venue.location}. Please let me know the availability and further details.`;
                const whatsappURL = `https://wa.me/+919361593819?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
              }}
              className="w-full mt-8 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default VenueDetails;