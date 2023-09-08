import React from 'react'
import { useState, useEffect } from 'react';


const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() =>{
    window.addEventListener('scroll', () =>{
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })
  })

  return (
    <nav className={`${isActive ? 'bg-white shadow-lg' : 'lg:bg-transparent'} bg-white fixed z-40 py-3 xl:px-32 xl:py-7 w-screen lg:py-5 lg:px-10 flex items-center justify-around lg:justify-between` }>
      

          <button className='text-3xl bg-transparent text-black p-0 lg:hidden' onClick={()=>
          setMobileNav(!mobileNav)}>
            <ion-icon name="menu-outline"></ion-icon>
          </button>

          <a href="#" className={`${isActive ? 'text-black' : 'lg:text-white'} font-[bangers] text-2xl lg:text-4xl`}>
            Pet's Shop
          </a>

          <ul className='hidden lg:flex lg:items-center lg:gap-8'>
            <li>
              <a className={`${isActive ? 'lg:text-black' : 'lg:text-white'} font-semibold text-[15px] md:text-xl hover:text-orange-500 ease-in-out duration-200`} href="#">Home</a>
            </li>
            <li>
              <a className={`${isActive ? 'lg:text-black' : 'lg:text-white'} font-semibold text-lg md:text-xl hover:text-orange-500 ease-in-out duration-200`} href="#">Shop</a>
            </li>
            <li>
              <a className={`${isActive ? 'lg:text-black' : 'lg:text-white'} font-semibold text-lg md:text-xl hover:text-orange-500 ease-in-out duration-200`} href="#">Collection</a>
            </li>
            <li>
              <a className={`${isActive ? 'lg:text-black' : 'lg:text-white'} font-semibold text-lg md:text-xl hover:text-orange-500 ease-in-out duration-200`} href="#">Blogs</a>
            </li>
            <li>
              <a className={`${isActive ? 'lg:text-black' : 'lg:text-white'} font-semibold text-lg md:text-xl hover:text-orange-500 ease-in-out duration-200`} href="#">Contact</a>
            </li>
          </ul>
    

        <div className={`${isActive ? 'lg:text-black' : 'lg:text-white'} flex lg:gap-10 items-center text-2xl`}> 
          <a href="#">
              <ion-icon name="bag-handle-outline"></ion-icon>
          </a>
        </div>

        <div className={`${mobileNav ? 'left-0' : '-left-full'} fixed top-0 bottom-0 p-8 transition-all flex flex-col w-[250px] bg-white lg:hidden`}>
          <button className='absolute bg-transparent text-3xl right-6 top-8 text-black p-0' onClick={()=>
          setMobileNav(!mobileNav)}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
           <ul className='flex flex-col gap-3 '>
           <li>
              <a className={`lg:${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Home</a>
            </li>
            <li>
              <a className={`lg:${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Shop</a>
            </li>
            <li>
              <a className={`lg:${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Collection</a>
            </li>
            <li>
              <a className={`lg:${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Blogs</a>
            </li>
            <li>
              <a className={`lg:${isActive ? 'text-black' : 'text-white'} font-semibold text-lg hover:text-orange-500 ease-in-out duration-200`} href="#">Contact</a>
            </li>

            <button className='mt-3'>
              Register
            </button>
           </ul>
        </div>
    </nav>
  )
}
export default Navbar