import React from 'react'
import ft1 from '../assets/images/service-image.png'
import ft2 from '../assets/images/service-icon-1.png'
import ft3 from '../assets/images/service-icon-2.png'
import ft4 from '../assets/images/service-icon-3.png'
import ft5 from '../assets/images/service-icon-4.png'

const Features = () => {
  return (
    <div className='py-20 flex flex-col items-center gap-20'>
        <div className='flex flex-col max-w-xl gap-4 items-center px-6'>
          <img src={ft1} alt="" />
          <h1 className='text-4xl md:px-20 text-center font-semibold'><span className='text-orange-500'>What your pet needs,</span> when they need it.</h1>
        </div>

        <ul className='grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-8 lg:flex-row md:px-12'>
          <li className='flex flex-col items-center text-center px-5'>
            <img src={ft2} alt="" />
            <h1 className='text-3xl pt-1 font-semibold'>Free Same-day Delivery</h1>
            <p className='text-gray-500 font-medium px-5'>Order by 2pm local time to get free delivery on orders $35+ today.</p>
          </li>

          <li className='flex flex-col items-center text-center px-5'>
            <img src={ft3} alt="" />
            <h1 className='text-3xl pt-1 font-semibold'>30 Day Return</h1>
            <p className='text-gray-500 font-medium'>35% off your first order plus 5% off all future orders.</p>
          </li>

          <li className='flex flex-col items-center text-center px-5'>
            <img src={ft4} alt="" />
            <h1 className='text-3xl pt-1 font-semibold'>Security payment</h1>
            <p className='text-gray-500 font-medium'>25% off your online order of $50+. Available at most locations.</p>
          </li>

          <li className='flex flex-col items-center text-center px-5'>
            <img src={ft5} alt="" />
            <h1 className='text-3xl pt-1 font-semibold'>24/7 Support</h1>
            <p className='text-gray-500 font-medium'>Shop online to get orders over $35 shipped fast and free.</p>
          </li>
         
        
        </ul>
    </div>
  )
}

export default Features