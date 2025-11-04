import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from './ProductCard';

const AllProducts = () => {
    const products = useLoaderData();
    console.log(products)
    return (
        <div>
            <div className='grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
          {
            products.map(product=> <ProductCard key={product._id} product={product}></ProductCard>)
          }  
        </div>
        </div>
    );
};

export default AllProducts;