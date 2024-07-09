import React, { useState, useEffect } from 'react'
import { Product } from '../../typings'
import { useStore } from '../contexts/StoreContext'
import { getProducts } from '../services/storeServices'
import ProductCard from './ProductCard'

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
                <div className='popular-items flex flex-row'>
                    {products.map((product, idx) => { return <ProductCard key={idx} product={product} />})}
                </div>
            ):(
            <p> No Product found ..</p>
            )}
        </div>
    )
}

export default Popular
