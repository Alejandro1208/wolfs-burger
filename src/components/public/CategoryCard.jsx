import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category, image, description }) => {
  return (
    <Link
      to={`/menu?category=${category.id}`}
      className="group relative overflow-hidden rounded-xl shadow-lg card-hover block"
    >
      <div className="aspect-w-16 aspect-h-12 h-64">
        <img
          src={image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
        <p className="text-gray-200 text-sm">{description}</p>
        <div className="mt-3 inline-flex items-center text-primary-300 font-medium">
          Ver productos →
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;