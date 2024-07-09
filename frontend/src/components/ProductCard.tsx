import React from 'react'
import { Product } from '../../typings';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: {product: Product}) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 p-4">
      <div className="border rounded-lg overflow-hidden">
        {product.imageURL ? (
          <img className="w-full" src={product.imageURL} alt={product.name} />
        ) : (
          <img className="w-full" src={process.env.PUBLIC_URL + '/images/placeholder.png'} alt={product.name} />
        )}
        <div className="p-4">
          <h6 className="font-semibold">{product.name}</h6>
          <hr className="my-2" />
          <div className="flex items-center justify-between">
            <Link to={`/${product.name}`} className="text-gray-700 border border-gray-400 rounded px-4 py-2 text-sm hover:bg-gray-100">
              View
            </Link>
            <span className="font-semibold">${product.current_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
