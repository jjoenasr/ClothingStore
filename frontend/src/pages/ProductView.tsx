import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useStore } from '../contexts/StoreContext';
import { Item, Product } from '../../typings';
import { getProduct } from '../services/storeServices';
import{  HeartIcon } from '@heroicons/react/24/outline'

const emptyProduct = {
  id: -1,
  name: '',
  get_absolute_url: '',
  description: '',
  imageURL: '',
  price: '',
  sizes: [],
  current_price: -1
}


const ProductView = () => {
  const { category_slug, product_slug } = useParams();
  const [product, setProduct] = useState<Product>(emptyProduct)
  const [selectedSize, setSelectedSize] = useState<string>('');
  const {addToCart} = useStore()

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const product = await getProduct(category_slug || '', product_slug || '')
        
        setProduct(product)
        setSelectedSize(product.sizes.length > 0 ?product.sizes[0].name : '')
      } catch(error:unknown){
        console.error("Error: ", error)
      }
    }

    document.title = product.name + ' | Djackets';
    fetchProduct()
  },[product.name, category_slug, product_slug])

  const add = () => {
    const item:Item = {
      product: product,
      quantity: 1,
      size: selectedSize
    };

    addToCart(item)



    toast.success('The product was added to the cart', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: true,
      closeOnClick: true,
      draggable: true,
    });
    navigate('/');
  }

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    // Handle any other logic on size change if needed
  };

  return (
    <div>
    { product && (
      <div className='flex flex-wrap pt-[96px] lg:pl-10'>
        <div className='w-full md:w-1/2 justify-end px-2'>
          <img
            className="w-full h-auto object-cover"
            src={product.imageURL ? API_URL + product.imageURL : process.env.PUBLIC_URL + "/images/placeholder.png"}
            alt={product.name}
          />
        </div>
        <div className='w-full max-w-lg md:w-1/2 px-4'>
        <Link className="btn-dark my-3" to="/">
          &#x2190; Continue Shopping
        </Link>
        <div className='flex flex-col space-y-4'>
          <h3 className='font-bold text-2xl'>{product.name}</h3>
          <div className='font-bold'>${product.current_price}</div>

          <select
          className='w-full font-semibold hover:shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
          value={selectedSize}
          onChange={handleChange}>
            {product.sizes.map(size => (
              <option
                key={size.name}
                value={size.name}
                disabled={size.status === 'outOfStock'}
                className={`font-semibold text-sm ${size.status === 'outOfStock' ? 'text-gray-400' : ''}`}
              >
              {size.name} {size.status === 'LowOnStock' && '(Low on Stock)'}
            </option>
            ))}
          </select>

          <div className='flex justify-between w-full'>
          <button className='btn-success w-2/3 flex-1 ' onClick={add}> Add to my basket</button>
          <div className='flex items-center rounded-full justify-center w-12 h-12 mx-2 border'>
            <HeartIcon className='h-6 w-6 cursor-pointer  text-gray-500 hover:text-red-500' />
          </div>
          </div>
          
          <hr />
          <h3 className='font-bold text-md'>Description</h3>
          <p>{product.description}</p>
          <hr />
        </div>
        </div>
      </div>
    )}
  </div>
  )
}

export default ProductView
