import React from 'react'
import Prod1 from '../assets/images/product-1.jpg'
import Prod2 from '../assets/images/product-2.jpg'
import Prod3 from '../assets/images/product-3.jpg'
import Prod4 from '../assets/images/product-4.jpg'
import Prod5 from '../assets/images/product-5.jpg'
import Prod6 from '../assets/images/product-6.jpg'
import Prod7 from '../assets/images/product-7.jpg'

const Items = () => {
  return (
    <div className='flex flex-col h-auto justify-center'>
        <h1 className='text-3xl flex text-center flex-row gap-2 font-bold'><span className='text-orange-500'>Best</span>Seller</h1>

        <div>
            <div className='max-w-sm'>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[1px] border-gray-200' src={Prod1} alt="" />
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex flex-row gap-2'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1>Commodo leo sed porta</h1>
                        <h3>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[1px] border-gray-200' src={Prod2} alt="" />
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex flex-row gap-2'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1>Commodo leo sed porta</h1>
                        <h3>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[1px] border-gray-200' src={Prod3} alt="" />
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex flex-row gap-2'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1>Commodo leo sed porta</h1>
                        <h3>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[1px] border-gray-200' src={Prod1} alt="" />
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex flex-row gap-2'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1>Commodo leo sed porta</h1>
                        <h3>$15.00</h3>
                    </div>
                </figure>
            </div>
        </div>
    </div>
  )
}

export default Items