import { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import { Sidebar } from "../components/sidebar";
import "./AdminDashboard.css";

const COLORS = ["#0088FE", "#00C49F"];

export default function Dashboard() {
    const [stats, setStats] = useState({ newBookings: 0, availableRooms: 0, revenue: 0, checkouts: 0 });
    const [bookingData, setBookingData] = useState([]);
    const [roomStats, setRoomStats] = useState({});

    useEffect(() => {
        fetch("http://localhost:5000/api/dashboard")
            .then((res) => res.json())
            .then((data) => {
                console.log("Dashboard API response:", data);
                setStats(data.stats || {});
                setBookingData(data.bookings || []);
                setRoomStats(data.rooms || {});
            })
            .catch((err) => console.error("Error fetching dashboard data:", err));
    }, []);

    const pieData = [
        { name: "Booked", value: stats?.newBookings || 0 },
        { name: "Available", value: stats?.availableRooms || 0 }
    ];

    return (
        <div className="dashboard-container">
            <Sidebar /> {/* Sidebar is now a separate component */}

            <div className="main-content">
                <h1>Dashboard</h1>
                <div className="stats-grid">
                    {[{ label: "New Bookings", value: stats?.newBookings || 0 },
                    { label: "Available Rooms", value: stats.availableRooms || 0 },
                    { label: "Revenue", value: `$${stats.revenue ? stats.revenue.toLocaleString() : 0}` },
                    { label: "Checkouts", value: stats.checkouts || 0 }].map((stat, index) => (
                        <div key={index} className="stat-card">
                            <h3>{stat.label}</h3>
                            <p>{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="charts-container">
                    <div className="room-status">
                        <h3>Room Status</h3>
                        <p>Occupied: {roomStats.occupied || 0}</p>
                        <p>Reserved: {roomStats.reserved || 0}</p>
                        <p>Available: {roomStats.available || 0}</p>
                        <p>Not Ready: {roomStats.notReady || 0}</p>
                    </div>
                    <div className="booking-distribution">
                        <h3>Booking Distribution</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="booking-trends">
                    <h3>Booking Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={bookingData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" stroke="#555" />
                            <YAxis stroke="#555" />
                            <Tooltip />
                            <Bar dataKey="booked" fill="#4F46E5" />
                            <Bar dataKey="cancelled" fill="#EF4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
