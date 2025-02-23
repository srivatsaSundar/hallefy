import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Palette, Heart, Building2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: Building2,
    name: 'Venues',
    path: '/venues',
    image: 'https://img.freepik.com/premium-photo/huge-stage-wedding-ceremony-with-beautiful-yellow-sofa-bride-groom_747653-15500.jpg',
  },
  {
    icon: Camera,
    name: 'Photographers',
    path: '/photographers',
    image: 'https://media.istockphoto.com/id/1395071229/photo/young-passionate-photographer-image-indian-boy.jpg?s=612x612&w=0&k=20&c=ys1k1ZA5rJzom6HaSvX_HMlAEFh52XTMkULIzJPiyl8=',
  },
  {
    icon: Palette,
    name: 'Makeup',
    path: '/makeup',
    image: 'https://i.pinimg.com/736x/01/09/c4/0109c41b5e443f51f2caaa6fd39d2417.jpg',
  },
  {
    icon: Video,
    name: 'Pre Wedding Shoot',
    path: '/pre-wedding',
    image: 'https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/004/699/360/new_large/02.jpg?1661353920',
  },
  {
    icon: Sparkles,
    name: 'Planning & Decor',
    path: '/planning',
    image: 'https://mysticstudios.in/wp-content/uploads/2021/03/coimbatore-radisson-blu-wedding-photographer-17.jpg',
  },
  {
    icon: Heart,
    name: 'Bridal Wear',
    path: '/bridal-wear',
    image: 'https://shaadiwish.com/blog/wp-content/uploads/2020/06/south-indian-bridal-look.jpg',
  },
];

export const WeddingCategories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Wedding Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  className="block relative overflow-hidden rounded-lg shadow-md"
                >
                  <div className="relative h-64">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Icon className="h-12 w-12 mb-3" />
                      <span className="text-lg font-semibold">{category.name}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default WeddingCategories;