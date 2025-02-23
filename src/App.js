import React, { useState } from 'react';
import './styles.css';  // Import custom CSS

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicDashboard from './pages/PublicDashboard';
import { VenueDetails } from './pages/VenueDetails';
import { Wishlist } from './pages/Wishlist';
import { StoryDetails } from './pages/StoryDetails';
import SearchPage from './pages/SearchPage';

import LoginRegisterPage from './pages/LoginRegisterPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';

import Booking from './pages/bookings.jsx';
import VenuePage from "./pages/VenuePage.jsx";
import VendorPage from "./pages/Vendors.jsx";
import Stories from "./pages/stories.jsx";

import "./pages/venue.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicDashboard />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/wedding-stories" element={<Stories />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/story/:id" element={<StoryDetails />} />
          <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
