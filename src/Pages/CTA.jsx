import React from 'react'
import ctabg from '../assets/images/cta-banner.png'
import ctaimg from '../assets/images/cta-bg.jpg'
import ctaimg2 from '../assets/images/cta-icon.png'

const CTA = () => {
  return (
    <div className='flex flex-row justify-center items-center h-[600px]'>

      <figure className='h-[49%] absolute'>
        <img src={ctaimg} className='w-screen h-[100%]' alt="" />
      </figure>

      <div className=''>
        <img src={ctabg} className='relative max-w-[39rem] flex place-content-end' alt="" />
      </div>

      <div className='relative max-w-md flex flex-col gap-4 items-baseline'>
        <img src={ctaimg2} className='h-10' alt="" />
        <h2 class=' text-4xl font-bold'>Taste it, love it or we’ll replace it… Guaranteed!</h2>

        <p class="section-text">
          At Petio, we believe your dog and cat will love their food so much that if they don’t … we’ll help you
          find a replacement. That’s our taste guarantee.
        </p>
        
        <button>
        <a href="#" class="btn">Find out more</a>
        </button>
      </div>
    </div>
  )
}

export default CTA