import React from 'react'
import { useState, useEffect } from 'react';


const Navbar = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() =>{
    window.addEventListener('scroll', () =>{
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })
  })

  return (
    <nav className={`${isActive ? 'bg-white shadow-lg' : 'bg-transparent'} fixed z-30 w-full py-4 px-48 flex justify-between` }>
        <div className='flex gap-20'>
          <a href="#" className={`${isActive ? 'text-black' : 'text-white'} font-[bangers] text-5xl`}>
            Pet's Shop
          </a>

          <ul className='flex items-center gap-8'>
            <li>
              <a className={`${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Home</a>
            </li>
            <li>
              <a className={`${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Shop</a>
            </li>
            <li>
              <a className={`${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Collection</a>
            </li>
            <li>
              <a className={`${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Blogs</a>
            </li>
            <li>
              <a className={`${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className={`${isActive ? 'text-black' : 'text-white'} flex gap-10 items-center text-2xl`}> 
          <a href="#">
              <ion-icon name="bag-handle-outline"></ion-icon>
          </a>

          <a href="#">
              <ion-icon name="bag-handle-outline"></ion-icon>
          </a>
        </div>
    </nav>
  )
}
export default Navbar