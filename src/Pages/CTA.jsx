import React from 'react'
import ctabg from '../assets/images/cta-banner.png'
import ctaimg from '../assets/images/cta-bg.jpg'
import ctaimg2 from '../assets/images/cta-icon.png'

const CTA = () => {
  return (
    <div className='overflow-hidden relative h-[467px]'>
      
      <div className='md:grid grid-cols-2 md:items-end absolute'>
          <div>
            <img src={ctabg} className='relative hidden md:w-screen max-w-[39rem] lg:max-w-[40rem] md:flex place-content-end' alt="" />
          </div>

          <div className='lg:pb-10 max-w-md mt-[100px] px-12 flex flex-col gap-4 items-baseline'>
            <img src={ctaimg2} className='h-8' alt="" />
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

      <img src={ctaimg} className='w-screen h-full object-right object-cover' alt="" />
    </div>
  )
}

export default CTA