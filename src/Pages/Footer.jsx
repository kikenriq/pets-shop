import React from 'react'
import footerbg from '../assets/images/footer-bg.jpg'

const Footer = () => {
  return (
    <footer className=' bg-[--eerie-black] relative'>
     
      <div className='text-white py-12 px-4 xl:mt-[200px] gap-6 grid md:grid-cols-7 '>
        <a href="">
          <h1 className='text-2xl font-[bangers]'>Pets Shop</h1>
        </a>
      

      <ul className='flex flex-col gap-4'>
            <li class="flex items-center gap-2 font-semibold">
              <ion-icon name="location-outline" aria-hidden="true"></ion-icon>

              <address>
                30 Buttonwood St.Pataskala OH 43062
              </address>
            </li>

            <li class="flex items-center gap-2 font-semibold">
              <ion-icon name="call-outline" aria-hidden="true"></ion-icon>

              <a href="tel:+16234567891011">(+1)-6234-56-789-1011</a>
            </li>
      </ul>
      
      <ul className='flex flex-row gap-3 text-xl'>
            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-twitter"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-pinterest"></ion-icon>
              </a>
            </li>

            <li>
              <a href="#" class="social-link">
                <ion-icon name="logo-instagram"></ion-icon>
              </a>
            </li>
      </ul>

      <ul className='flex flex-col gap-3'>

          <li>
            <p class="font-semibold text-xl">Corporate</p>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Careers</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">About Us</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Contact Us</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">FAQs</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Vendors</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Affiliate Program</a>
          </li>

      </ul>

      <ul className='flex flex-col gap-3'>
          <li>
            <p className='font-semibold text-xl'>Information</p>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Online Store</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Privacy Policy</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Refund Policy</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Shipping Policy</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Terms of Service</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Track Order</a>
          </li>
      </ul>

      <ul className='flex flex-col gap-3'>
          <li>
            <p class="font-semibold text-xl">Services</p>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Grooming</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Positive Dog Training</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Veterinary Services</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Petco Insurance</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Pet Adoption</a>
          </li>

          <li>
            <a href="#" className="text-[--battleship-gray] hover:text-orange-400">Resource Center</a>
          </li>
      </ul>

      </div>

      
    </footer>
  )
}

export default Footer