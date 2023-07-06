import React from 'react'
import ctabg from '../assets/images/cta-banner.png'
import ctaimg from '../assets/images/cta-bg.jpg'
import ctaimg2 from '../assets/images/cta-icon.png'

const CTA = () => {
  return (
    <div className='h-auto'>
        <div className='h-[300px]'>
        <img src={ctaimg} className='h-full object-cover object-left' alt="" />
        </div>
    </div>
  )
}

export default CTA