import React from 'react'
import { Button, Navbar } from 'flowbite-react';


const resNavbar = () => {
  return (
    <>
    <Navbar
      fluid
      rounded
      className='w-screen items-center px-4 md:px-48 fixed z-30 shadow-lg'
    >
        
    <Navbar.Toggle className=' bg-transparent md:hidden'/>

      <Navbar.Brand href="https://flowbite-react.com">
       <a href="#">
         <h1 className=' text-3xl font-[bangers]'>Pets's Shop</h1>
       </a>
      </Navbar.Brand>

      <div className=" md:order-2">
        <a href="#" className='text-3xl text-gray-700'>
            <ion-icon name="bag-handle-outline"></ion-icon>
        </a>
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          active
          href="#"
          className=' bg-orange-400'
        >
          <p>
            Home
          </p>
        </Navbar.Link>
        <Navbar.Link href="#">
          About
        </Navbar.Link>
        <Navbar.Link href="#">
          Services
        </Navbar.Link>
        <Navbar.Link href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>

    </Navbar>

    </>
  )
}
export default resNavbar