import React from 'react'
import brand1 from '../assets/images/brand-1.jpg'
import brand2 from '../assets/images/brand-2.jpg'
import brand3 from '../assets/images/brand-3.jpg'
import brand4 from '../assets/images/brand-4.jpg'
import brand5 from '../assets/images/brand-5.jpg'

const Brands = () => {
  return (
    <div>
         <div className=' h-[500px] md:h-auto md:max-w-none px-28 p-5 pb-4'>
              <h1 className='py-14 text-center text-3xl font-bold flex flex-row gap-2 justify-center'><span className='text-[--portland-orange]'>Best</span> Brands</h1>
          <ul className='flex flex-row px-24 gap-8 md:justify-center overflow-x-auto md:overflow-visible snap-x pb-5'>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ brand1 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Cat Food</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ brand2 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Cat Toys</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ brand3 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Food</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ brand4 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Toy's</h1>
            </li>

            <li className='flex flex-col gap-4'>
                <img className=' max-w-md object-cover' src={ brand5 } alt="" />
                <h1 className='text-xl text-[--eerie-black] hover:text-orange-400 ease-in-out duration-200 font-bold text-center'>Dog Toy's</h1>
            </li>
            
        </ul>
         </div> 
    </div>
  )
}

export default Brands