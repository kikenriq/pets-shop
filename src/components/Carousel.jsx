import React from 'react'
import { useState } from 'react'
import cat1 from '../assets/images/category-1.jpg'
import cat2 from '../assets/images/category-2.jpg'
import cat3 from '../assets/images/category-3.jpg'
import cat4 from '../assets/images/category-4.jpg'
import cat5 from '../assets/images/category-5.jpg'

const Carousel = () => {
  return (
   <div className='max-w-sm h-[500px] md:h-auto md:max-w-none p-5 pb-8'>
    <h1 className='py-14 text-center text-3xl font-bold flex flex-row gap-2 justify-center'><span className='text-[--portland-orange]'>Top</span> categories</h1>
        <ul className='flex flex-row gap-8 md:justify-center overflow-x-auto md:overflow-visible snap-x pb-5'>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ cat1 } alt="" />
                <h1 className='text-xl text-[--eerie-black] font-bold text-center'>Cat Food</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ cat2 } alt="" />
                <h1 className='text-xl text-[--eerie-black] font-bold text-center'>Cat Toys</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ cat3 } alt="" />
                <h1 className='text-xl text-[--eerie-black] font-bold text-center'>Dog Food</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ cat4 } alt="" />
                <h1 className='text-xl text-[--eerie-black] font-bold text-center'>Dog Toy's</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ cat5 } alt="" />
                <h1 className='text-xl text-[--eerie-black] font-bold text-center'>Dog Toy's</h1>
            </li>
            
        </ul>
   </div> 
  )
}

export default Carousel