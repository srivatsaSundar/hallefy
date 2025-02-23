import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaUser, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import "./bookings.css";
import { Sidebar } from "../components/sidebar";
import AddBookingModal from "../components/AddBookingModal";

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        setLoading(true);
        setError("");

        fetch("http://localhost:5000/api/bookings")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch bookings.");
                return res.json();
            })
            .then(data => setBookings(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBookings = bookings.filter((booking) =>
        booking.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bookings-page p-6">
            <Sidebar />
            <div className="bookings-header flex justify-between items-center mb-6">
                <h1 className="bookings-title text-2xl font-bold">Bookings</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="booking-add-btn bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center"
                >
                    <FaPlus className="mr-2" /> Add Booking
                </button>
            </div>

            {/* Filters */}
            <div className="bookings-filters flex space-x-4 mb-6">
                <div className="search-container relative">
                    <FaSearch className="search-icon absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        className="search-input pl-10 pr-4 py-2 border rounded-lg w-64"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Booking Cards */}
            {loading ? (
                <p>Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
            ) : (
                <div className="booking-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBookings.map((booking) => (
                        <div key={booking.id} className="booking-card bg-white shadow-lg rounded-lg p-4">
                            <h2 className="booking-name font-bold text-lg flex items-center">
                                <FaUser className="mr-2" /> {booking.customer}
                            </h2>
                            <p className="booking-date text-gray-600 flex items-center">
                                <FaCalendarAlt className="mr-2" /> {new Date(booking.eventDate).toLocaleDateString()}
                            </p>
                            <p className="booking-amount text-gray-600 flex items-center">
                                <FaDollarSign className="mr-2" /> ${booking.totalAmount}
                            </p>
                            <p className="booking-status text-gray-600">Status: {booking.status}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Booking Modal */}
            {showModal && (
                <AddBookingModal
                    onClose={() => {
                        setShowModal(false);
                        fetchBookings(); // Refresh bookings after new booking
                    }}
                />
            )}
        </div>
    );
}
