import React from 'react';

const BookingCard = ({ booking }) => {
    return (
        <div className="booking-card">
            <div className="booking-details">
                <h3>{booking.customerName}</h3>
                <p>Email: {booking.email}</p>
                <p>Package: {booking.packageType}</p>
                <p>Venue: {booking.venue}</p>
                <p>Status: <span className={`status ${booking.status}`}>{booking.status}</span></p>
                <p>Check-in: {booking.checkIn}</p>
                <p>Check-out: {booking.checkOut}</p>
                <p>Payment: <span className={`payment ${booking.paymentStatus}`}>{booking.paymentStatus}</span></p>
            </div>
        </div>
    );
};

export default BookingCard;
