import React, { useState, useEffect } from 'react'
import { Product } from '../../typings'
import { useStore } from '../contexts/StoreContext'
import { getProducts } from '../services/storeServices'
import ProductCard from './ProductCard'
import { MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Popular = () => {
    const [products, setProducts] = useState<Product[]>([])
    const {setLoading} = useStore()

    useEffect(()=>{
        const fetchProducts = async() =>{
        try {
            setLoading(true)
            const products = await getProducts()
            setProducts(products)
            setLoading(false)
        } catch(error:any){
            console.error("Error: ", error)
        }
        }
        fetchProducts();
    }, [])
    return (
        <div>
            { products? (
                <div className='bg-white text-black py-8 '>
                    <nav className="w-full z-30 top-0 px-6 py-1">
                        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
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
                    {products.map((product, idx) => { return <ProductCard key={idx} product={product} />})}
                    </div>
                </div>
            ):(
            <p> No Product found ..</p>
            )}
        </div>
    )
}

export default Popular
