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
    <div className='flex flex-col gap-12 h-auto md:w-screen justify-center'>
        <h1 className='text-3xl text-center gap-2 font-bold'><span className='text-orange-500'>Best </span>Seller</h1>

        <div className='w-full'>
            <div className=' grid-cols-1 md:grid-cols-2 grid gap-10'>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod1} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod2} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod3} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod4} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod5} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod6} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[2px] border-gray-200' src={Prod7} alt="" />
                    <div className='flex flex-col text-center gap-2'>
                        <div className='flex flex-row gap-2 justify-center pt-4'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className='text-xl font-semibold hover:text-orange-400 ease-in-out transition text-[--eerie-black]'>Commodo leo sed porta</h1>
                        <h3 className='text-2xl font-semibold text-orange-400'>$15.00</h3>
                    </div>
                </figure>
                
            </div>
        </div>
    </div>
  )
}

export default Items