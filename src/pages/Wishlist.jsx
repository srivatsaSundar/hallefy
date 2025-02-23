import React from 'react';
import { useStore } from '../store/useStore';
import { HallCard } from '../components/HallCard';

export const Wishlist = () => {
  const { user, halls } = useStore();
  const wishlistedHalls = halls.filter((hall) => user?.wishlist.includes(hall.id));

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        {wishlistedHalls.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No venues in your wishlist yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedHalls.map((hall) => (
              <HallCard key={hall.id} hall={hall} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Wishlist;