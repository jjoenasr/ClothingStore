import React from 'react'
import { Product } from '../../typings'
import { getProducts } from '../services/storeServices'
import ProductCard from './ProductCard'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";

const Popular = () => {
    // Fetch products using React Query
    const { data: products } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 15, // Cache for 5 minutes
    });

    return (
        <div>
            { products? (
                <div className='bg-white text-black py-8 '>
                    <nav className="w-full z-30 top-0 py-1 px-6">
                        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-1 py-3">
                            <Link className="uppercase font-bold text-gray-800 text-xl " to="#">
                                Popular
                                <hr className="w-200 h-1.5 rounded-full bg-gray-900"/>
                            </Link>

                            <div className="flex items-center" >

                                <Link className="pl-3 inline-block text-gray-800 hover:text-black" to="#">
                                    <AdjustmentsHorizontalIcon className='h-6 w-6 ' />
                                </Link>

                                <Link className="pl-3 inline-block text-gray-800 hover:text-black" to="#">
                                    <MagnifyingGlassIcon className='h-6 w-6' /> 
                                </Link>

                            </div>
                        </div>
                        
                    </nav>
                    <div className='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
                    {products.map((product, idx) => { return (
                        <div className='lg:w-1/4 md:w-1/3 p-6 w-1/2' key={idx}>
                            <ProductCard product={product} />
                        </div>
                    )})}
                    </div>
                </div>
            ):(
            <p> No Product found ..</p>
            )}
        </div>
    )
}

export default Popular
