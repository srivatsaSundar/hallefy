import { create } from 'zustand';

const useStore = create((set) => ({
  halls: [],
  user: null,
  bookings: [],
  setUser: (user) => set({ user }),
  addToWishlist: (hallId) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, wishlist: [...state.user.wishlist, hallId] }
        : null,
    })),
  removeFromWishlist: (hallId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            wishlist: state.user.wishlist.filter((id) => id !== hallId),
          }
        : null,
    })),
}));

export { useStore };