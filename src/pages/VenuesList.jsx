import React from 'react';
import venues from './venueData';
import { HallCard } from '../components/HallCard';

const VenuesList = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {venues.map((hall) => (
        <HallCard key={hall.id} hall={hall} />
      ))}
    </div>
  );
};

export default VenuesList;