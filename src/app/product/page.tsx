import ProductCard from '@/components/Home/ProductCart'
import React from 'react'
import { products } from '@/components/Home/product'


const page = () => {
  return (
    <div>
       <h1 className='text-2xl font-bold text-center mt-10'> Best Selling Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10'> 
       
        {   products?.map((product) => (
          //@ts-ignore
          <ProductCard  product={product} />
        ))}
      </div>
    </div>
  )
}

export default page