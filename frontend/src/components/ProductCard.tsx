import React from 'react'
import { Product } from '../../typings';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';
import{ HeartIcon } from '@heroicons/react/24/outline'
import { useStore } from '../contexts/StoreContext';
import {  toast } from 'react-toastify';

const ProductCard = ({ product }: {product: Product}) => {
  const {addToFavorites} = useStore()

  const addProduct = () => {
    addToFavorites(product)


    toast.success('The product was added to your favorites', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    });
  }

  return (
    <div className="lg:w-1/4 md:w-1/3 p-6 w-1/2">
      <div   className="flex flex-col rounded-lg overflow-hidden">
        <Link to={`${product.get_absolute_url}`}>
          {product.imageURL ? (
            <img className="h-48 w-full md:h-80 lg:h-96 object-cover transition duration-300 transform hover:scale-105 hover:shadow-lg" src={API_URL+product.imageURL} alt={product.name} />
          ) : (
            <img className="h-48 w-full md:h-80 lg:h-96 object-cover transition duration-300 transform hover:scale-105 hover:shadow-lg" src={process.env.PUBLIC_URL + '/images/placeholder.png'} alt={product.name} />
          )}
        </Link>
        <div className="pt-3 flex flex-1 items-center justify-between">
          <h6 className="font-light">{product.name}</h6>
          <div className='flex items-end '>
          <HeartIcon className='h-6 w-6 mr-2 cursor-pointer  text-gray-500 hover:text-red-500' onClick={addProduct} />
          </div>
        </div>
        <p className="pt-1 text-gray-900 font-semibold">£{product.current_price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
