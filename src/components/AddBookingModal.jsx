import React, { useState, useEffect } from "react";

const AddBookingModal = ({ onClose, userId }) => {
    const [venues, setVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [eventDate, setEventDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedPackage, setSelectedPackage] = useState("premium");
    const [totalAmount, setTotalAmount] = useState(0);
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/venues")
            .then(res => res.json())
            .then(data => setVenues(data))
            .catch(err => console.error("Error fetching venues:", err));
    }, []);

    const handleVenueChange = (e) => {
        const venue = venues.find(v => v.id === Number(e.target.value));
        setSelectedVenue(venue || null);
    };

    useEffect(() => {
        if (selectedVenue && startTime && endTime) {
            const start = new Date(`2000-01-01T${startTime}`);
            const end = new Date(`2000-01-01T${endTime}`);
            const hours = (end - start) / (1000 * 60 * 60);

            if (hours > 0) {
                setTotalAmount(hours * (selectedVenue.pricePerHour || 0));
            } else {
                setTotalAmount(0);
            }
        }
    }, [selectedVenue, startTime, endTime]);

    const handleBookingSubmit = () => {
        setError(""); // Clear previous errors

        if (!selectedVenue || !eventDate || !startTime || !endTime || !contact || !email) {
            setError("All fields are required.");
            return;
        }

        // Validate start and end time
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        if (start >= end) {
            setError("End time must be after start time.");
            return;
        }

        const checkIn = `${eventDate} ${startTime}:00`;
        const checkOut = `${eventDate} ${endTime}:00`;

        const newBooking = {
            user_id: 1,  // ✅ Match backend expected format
            venue_id: selectedVenue.id,
            customer: "John Doe",
            email,
            packageType: selectedPackage,
            status: "Pending",
            checkIn,
            checkOut,
            payment: totalAmount,
            contact,
        };


        fetch("http://localhost:5000/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking),
        })
            .then(async (res) => {
                const responseData = await res.json();
                if (!res.ok) {
                    throw new Error(responseData.error || "Failed to create booking.");
                }
                return responseData;
            })
            .then(() => onClose()) // Close modal only on success
            .catch(err => {
                console.error("Booking error:", err);
                setError(err.message);
            });

    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold">New Booking</h2>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <label className="block mt-4">Venue</label>
                <select
                    className="border px-3 py-2 w-full rounded"
                    onChange={handleVenueChange}
                    value={selectedVenue?.id || ""}
                >
                    <option value="">Select a venue</option>
                    {venues.map(venue => (
                        <option key={venue.id} value={venue.id}>
                            {venue.name}
                        </option>
                    ))}
                </select>

                <label className="block mt-4">Event Date</label>
                <input
                    type="date"
                    className="border px-3 py-2 w-full rounded"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                />

                <div className="flex space-x-4 mt-4">
                    <div>
                        <label>Start Time</label>
                        <input
                            type="time"
                            className="border px-3 py-2 w-full rounded"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input
                            type="time"
                            className="border px-3 py-2 w-full rounded"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>
                </div>

                <label className="block mt-4">Customer Email</label>
                <input
                    type="email"
                    className="border px-3 py-2 w-full rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="block mt-4">Contact</label>
                <input
                    type="text"
                    className="border px-3 py-2 w-full rounded"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

                <label className="block mt-4">Package Type</label>
                <div className="flex space-x-2">
                    {["all inclusive", "basic", "premium"].map(pkg => (
                        <button
                            key={pkg}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`px-4 py-2 rounded ${selectedPackage === pkg ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                        >
                            {pkg}
                        </button>
                    ))}
                </div>

                <div className="mt-4 bg-gray-100 p-3 rounded">
                    <p className="font-bold">Total Amount: <span className="text-green-600">${totalAmount.toFixed(2)}</span></p>
                </div>

                <div className="mt-4 flex justify-between">
                    <button onClick={onClose} className="text-gray-600">Cancel</button>
                    <button onClick={handleBookingSubmit} className="bg-indigo-600 text-white px-4 py-2 rounded">
                        Create Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBookingModal;
