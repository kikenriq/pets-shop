import React from 'react'
import footerbg from '../assets/images/footer-bg.jpg'

const Footer = () => {
  return (
    <footer className='h-full w-full'>
      <img src={footerbg} className='absolute h-full object-cover object-center' alt="" />

      <div className='relative text-white p-10 flex flex-col gap-8'>
        <a href="">
          <h1 className='text-2xl font-[bangers]'>Pets Shop</h1>
        </a>
      

      <ul className='flex flex-col'>
            <li class="contact-item">
              <ion-icon name="location-outline" aria-hidden="true"></ion-icon>

              <address>
                30 Buttonwood St.Pataskala OH 43062
              </address>
            </li>

            <li class="contact-item">
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

      <ul>

          <li>
            <p class="footer-list-title">Corporate</p>
          </li>

          <li>
            <a href="#" class="footer-link">Careers</a>
          </li>

          <li>
            <a href="#" class="footer-link">About Us</a>
          </li>

          <li>
            <a href="#" class="footer-link">Contact Us</a>
          </li>

          <li>
            <a href="#" class="footer-link">FAQs</a>
          </li>

          <li>
            <a href="#" class="footer-link">Vendors</a>
          </li>

          <li>
            <a href="#" class="footer-link">Affiliate Program</a>
          </li>

      </ul>

      <ul>
          <li>
            <p>Information</p>
          </li>

          <li>
            <a href="#" class="footer-link">Online Store</a>
          </li>

          <li>
            <a href="#" class="footer-link">Privacy Policy</a>
          </li>

          <li>
            <a href="#" class="footer-link">Refund Policy</a>
          </li>

          <li>
            <a href="#" class="footer-link">Shipping Policy</a>
          </li>

          <li>
            <a href="#" class="footer-link">Terms of Service</a>
          </li>

          <li>
            <a href="#" class="footer-link">Track Order</a>
          </li>
      </ul>

      <ul>
          <li>
            <p class="footer-list-title">Services</p>
          </li>

          <li>
            <a href="#" class="footer-link">Grooming</a>
          </li>

          <li>
            <a href="#" class="footer-link">Positive Dog Training</a>
          </li>

          <li>
            <a href="#" class="footer-link">Veterinary Services</a>
          </li>

          <li>
            <a href="#" class="footer-link">Petco Insurance</a>
          </li>

          <li>
            <a href="#" class="footer-link">Pet Adoption</a>
          </li>

          <li>
            <a href="#" class="footer-link">Resource Center</a>
          </li>
      </ul>

      </div>
    </footer>
  )
}

export default Footer