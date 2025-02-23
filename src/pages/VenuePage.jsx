import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaMapMarkerAlt, FaUsers, FaClock, FaStar, FaTimes } from "react-icons/fa";
import "./venue.css";
import { Sidebar } from "../components/sidebar";

export default function VenuePage() {
    const [venues, setVenues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [venueData, setVenueData] = useState({
        name: "",
        location: "",
        capacity: "",
        pricePerHour: "",
        about: "",
        googleMapLink: "",
        image: null,
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/venues")
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(err => console.error("Error fetching venues:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenueData({ ...venueData, [name]: value });
    };

    const handleFileChange = (e) => {
        setVenueData({ ...venueData, image: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(venueData).forEach(key => {
            formData.append(key, venueData[key]);
        });

        fetch("http://localhost:5000/api/add-venue", {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log("Venue added:", data);
                setShowModal(false);
                setVenues([...venues, data]);
            })
            .catch(err => console.error("Error adding venue:", err));
    };

    return (
        <div className="venue-page p-6">
            <Sidebar />
            <div className="venue-header flex justify-between items-center mb-6">
                <h1 className="venue-title text-2xl font-bold">Venues</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="venue-add-btn bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Venue
                </button>
            </div>

            {/* Filters */}
            <div className="venue-filters flex space-x-4 mb-6">
                <div className="search-container relative">
                    <FaSearch className="search-icon absolute left-3 top-3 text-gray-400" />
                    <input type="text" placeholder="Search venues..." className="search-input pl-10 pr-4 py-2 border rounded-lg w-64" />
                </div>
                <select className="filter-dropdown border px-4 py-2 rounded-lg">
                    <option>All Locations</option>
                </select>
                <select className="filter-dropdown border px-4 py-2 rounded-lg">
                    <option>All Capacities</option>
                </select>
                <select className="filter-dropdown border px-4 py-2 rounded-lg">
                    <option>All Availability</option>
                </select>
            </div>

            {/* Venue Cards */}
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
                            <p className="venue-location text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="mr-2" /> {venue.location}
                            </p>
                            <p className="venue-capacity text-gray-600 flex items-center">
                                <FaUsers className="mr-2" /> {venue.capacity} guests
                            </p>
                            <p className="venue-price text-gray-600 flex items-center">
                                <FaClock className="mr-2" /> ${venue.pricePerHour}/hour
                            </p>
                            <div className="venue-rating flex items-center mt-2 text-yellow-500">
                                <FaStar className="mr-1" /> {venue.rating}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Venue Modal */}
            {showModal && (
                <div className="venue-modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="venue-modal-content bg-white p-6 rounded-lg w-96">
                        <div className="venue-modal-header flex justify-between items-center">
                            <h2 className="modal-title text-xl font-bold">Add Venue</h2>
                            <button onClick={() => setShowModal(false)} className="modal-close text-gray-500">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="venue-form mt-4">
                            <input type="text" name="name" placeholder="Venue Name" value={venueData.name} onChange={handleChange} className="input-field border p-2 w-full mb-2" required />
                            <input type="text" name="location" placeholder="Location" value={venueData.location} onChange={handleChange} className="input-field border p-2 w-full mb-2" required />
                            <input type="number" name="capacity" placeholder="Capacity" value={venueData.capacity} onChange={handleChange} className="input-field border p-2 w-full mb-2" required />
                            <input type="number" name="pricePerHour" placeholder="Price per hour" value={venueData.pricePerHour} onChange={handleChange} className="input-field border p-2 w-full mb-2" required />
                            <textarea name="about" placeholder="About Venue" value={venueData.about} onChange={handleChange} className="input-field border p-2 w-full mb-2" required></textarea>
                            <input type="text" name="googleMapLink" placeholder="Google Map Link" value={venueData.googleMapLink} onChange={handleChange} className="input-field border p-2 w-full mb-2" required />
                            <input type="file" name="image" onChange={handleFileChange} className="input-field border p-2 w-full mb-2" required />
                            <button type="submit" className="submit-btn bg-indigo-600 text-white px-4 py-2 rounded-lg w-full">Add Venue</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
