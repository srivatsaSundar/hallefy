
import React, { useState, useEffect } from "react";
import { Navbar } from '../components/Navbar';
import { Link } from "react-router-dom";
import { FaPlus, FaSearch, FaMapMarkerAlt, FaUsers, FaClock, FaStar, FaTimes } from "react-icons/fa";
import { HeroSection } from '../components/HeroSection';
import { SearchFiltershome } from '../components/SearchFiltershome';
import { WeddingCategories } from '../components/WeddingCategories';
import { HallCard } from '../components/HallCard';
import { RealWeddingStories } from '../components/RealWeddingStories';
import venues from '../pages/venueData';
import {  ArrowRight } from 'lucide-react';


const PublicDashboard = () => {
    const [venues, setVenues] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/api/venues")
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(err => console.error("Error fetching venues:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <HeroSection />
            <div className="container ">
                <SearchFiltershome />
                <WeddingCategories />
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Venues</h2>
                    <div className="venue-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {venues.map((venue) => (
                            <div key={venue.id} className="venue-card bg-white shadow-lg rounded-lg overflow-hidden">
                                <img
                                    src={`http://localhost:5000/uploads/${venue.imageDir}`}
                                    alt={venue.name}
                                    className="venue-image w-full h-40 object-cover"

                                />

                                <div className="venue-details p-4">
                                    <h2 className="venue-name font-bold text-lg">{venue.name}</h2>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${venue.name},${venue.location}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="venue-location text-gray-600 flex items-center"
                                        >
                                        <FaMapMarkerAlt className="mr-2" /> {venue.location}
                                    </a>

                                    <p className="venue-capacity text-gray-600 flex items-center">
                                        <FaUsers className="mr-2" />up to {venue.capacity} guests
                                    </p>
                                    <p className="venue-price text-gray-600 flex items-center">
                                        <FaClock className="mr-2" /> ${venue.pricePerHour}/hour
                                    </p>
                                    {/* <div className="venue-rating flex items-center mt-2 text-yellow-500">
                                        <FaStar className="mr-1" /> {venue.rating}
                                    </div> */}
                                    <div className="mt-4 flex justify-between items-center">
                                    <Link
                                        to={`/venue/${venue.id}`}
                                        className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
                                    >
                                        <span>View More</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <RealWeddingStories />
            </div>
        </div>
    );
};

export default PublicDashboard;
