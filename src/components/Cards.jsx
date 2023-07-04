import React from 'react'
import offerbanner1 from '../assets/images/offer-banner-1.jpg'
import offerbanner2 from '../assets/images/offer-banner-2.jpg'
import offerbanner3 from '../assets/images/offer-banner-3.jpg'

const Cards = () => {
  return (
    <div className='flex flex-col items-center py-28'>
        <div className='max-w-xs overflow-hidden rounded-2xl'>
        <div className='absolute'>
                <p>Selected items. Online Only</p>
                <h1>Hot Summer Deals</h1>
                <button> Read More </button>
            </div>
            <img src={offerbanner1} className='' alt="" />
            
        </div>
    </div>
  )
}

export default Cards