
import React, { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaMapMarkerAlt, FaUsers, FaClock, FaStar, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import "./venue.css";
import { Sidebar } from "../components/sidebar";

export default function VenuePage() {
    const [venues, setVenues] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [venueData, setVenueData] = useState({
        name: "",
        location: "",
        capacity: "",
        pricePerHour: "",
        about: "",
        googleMapLink: "",
        image: null,
        image2: null,
        image3: null,
        amenities: {
            wifi: false,
            parking: false,
            catering: false,
            dj: false
        }
    });

    useEffect(() => {
        fetch("http://localhost:5000/api/venues")
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(err => console.error("Error fetching venues:", err));
    }, []);

    const handleChange = (event) => {
        setVenueData({ ...venueData, [event.target.name]: event.target.value });

        const { name, type, checked, value } = event.target;

        if (type === "checkbox") {
            setVenueData((prevData) => ({
                ...prevData,
                amenities: {
                    ...prevData.amenities,
                    [name]: checked,
                },
            }));
        } else {
            setVenueData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (event) => {
        setVenueData({ ...venueData, image: event.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(venueData).forEach(key => {
            formData.append(key, venueData[key]);
        });

        const url = editingVenue 
            ? `http://localhost:5000/api/edit-venue/${editingVenue.id}` 
            : "http://localhost:5000/api/add-venue";
        const method = editingVenue ? "PUT" : "POST";

        fetch(url, { method, body: formData })
            .then(res => res.json())
            .then(data => {
                if (editingVenue) {
                    setVenues(venues.map(v => (v.id === editingVenue.id ? { ...v, ...venueData } : v)));
                } else {
                    setVenues([...venues, data]);
                }
                setShowModal(false);
                setEditingVenue(null);
            })
            .catch(err => console.error("Error processing venue:", err));
    };

    const handleEdit = (venue) => {
        setVenueData({ ...venue, image: null });
        setEditingVenue(venue);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this venue?")) {
            fetch(`http://localhost:5000/api/delete-venue/${id}`, { method: "DELETE" })
                .then(res => res.json())
                .then(() => setVenues(venues.filter(v => v.id !== id)))
                .catch(err => console.error("Error deleting venue:", err));
        }
    };



    return (
        <div className="venue-page p-6">
            <Sidebar />
            <div className="venue-header flex justify-between items-center mb-6">
                <h1 className="venue-title text-2xl font-bold">Venues</h1>
                <button onClick={() => { setShowModal(true); setEditingVenue(null); }} className="venue-add-btn bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Add Venue
                </button>
            </div>

            <div className="venue-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {venues.map((venue) => (
                    <div key={venue.id} className="venue-card bg-white shadow-lg rounded-lg overflow-hidden bg-red-50">
                        <img src={`http://localhost:5000/uploads/${venue.imageDir}`} alt={venue.name} className="venue-image w-full h-40 object-cover" />
                        <div className="venue-details p-4">
                            <h2 className="venue-name font-bold text-lg">{venue.name}</h2>
                            <p className="venue-location text-gray-600 flex items-center"><FaMapMarkerAlt className="mr-2" /> {venue.location}</p>
                            <p className="venue-capacity text-gray-600 flex items-center"><FaUsers className="mr-2" /> {venue.capacity} guests</p>
                            <p className="venue-price text-gray-600 flex items-center"><FaClock className="mr-2" /> ${venue.pricePerHour}/hour</p>
                            <div className="venue-rating flex items-center mt-2 text-yellow-500"><FaStar className="mr-1" /> {venue.rating}</div>
                            <div className="venue-actions flex justify-between mt-4">
                                <button onClick={() => handleEdit(venue)} className="edit-btn bg-blue-500 text-white px-3 py-1 rounded-lg"><FaEdit /></button>
                                <button onClick={() => handleDelete(venue.id)} className="delete-btn bg-red-500 text-white px-3 py-1 rounded-lg"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="venue-modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="venue-modal-content bg-white p-6 rounded-lg w-[600px]">
                    <div className="venue-modal-header flex justify-between items-center mb-4">
                        <h2 className="modal-title text-xl font-bold">{editingVenue ? "Edit Venue" : "Add Venue"}</h2>
                        <button onClick={() => setShowModal(false)} className="modal-close text-gray-500"><FaTimes /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="venue-form grid grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder="Venue Name" value={venueData.name} onChange={handleChange} className="input-field border p-2 w-full" required />
                        <input type="text" name="location" placeholder="Location" value={venueData.location} onChange={handleChange} className="input-field border p-2 w-full" required />
                        <input type="number" name="capacity" placeholder="Capacity" value={venueData.capacity} onChange={handleChange} className="input-field border p-2 w-full" required />
                        <input type="number" name="pricePerHour" placeholder="Price per hour" value={venueData.pricePerHour} onChange={handleChange} className="input-field border p-2 w-full" required />
                        <textarea name="about" placeholder="About Venue" value={venueData.about} onChange={handleChange} className="input-field border p-2 w-full col-span-2" required></textarea>
                        <input type="text" name="googleMapLink" placeholder="Google Map Link" value={venueData.googleMapLink} onChange={handleChange} className="input-field border p-2 w-full col-span-2" required />
                        
                        <input type="file" name="image" onChange={handleFileChange} className="input-field border p-2 w-full" required />
                        <input type="file" name="image2" onChange={handleFileChange} className="input-field border p-2 w-full" required />
                        <input type="file" name="image3" onChange={handleFileChange} className="input-field border p-2 w-full col-span-2" required />
                        
                        <div className="amenities-section col-span-2 grid grid-cols-2 gap-4 mt-2">
                            <label className="flex items-center"><input type="checkbox" name="wifi" checked={venueData.amenities?.wifi} onChange={handleChange} className="mr-2" /> WiFi</label>
                            <label className="flex items-center"><input type="checkbox" name="parking" checked={venueData.amenities?.parking} onChange={handleChange} className="mr-2" /> Parking</label>
                            <label className="flex items-center"><input type="checkbox" name="catering" checked={venueData.amenities?.catering} onChange={handleChange} className="mr-2" /> Catering</label>
                            <label className="flex items-center"><input type="checkbox" name="dj" checked={venueData.amenities?.dj} onChange={handleChange} className="mr-2" /> DJ</label>
                        </div>
                        
                        <button type="submit" className="submit-btn bg-indigo-600 text-white px-4 py-2 rounded-lg w-full col-span-2">{editingVenue ? "Update Venue" : "Add Venue"}</button>
                    </form>
                </div>
            </div>
            
            )}
        </div>
    );
}
