import React from 'react'
import { useState } from 'react'
import cat1 from '../assets/images/category-1.jpg'
import cat2 from '../assets/images/category-2.jpg'
import cat3 from '../assets/images/category-3.jpg'
import cat4 from '../assets/images/category-4.jpg'
import cat5 from '../assets/images/category-5.jpg'

const Carousel = () => {
  return (
    <div id="animation-carousel" class="relative w-full" data-carousel="static">
        
            <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                
                <div class="hidden duration-200 ease-linear" data-carousel-item>
                    <img src={cat1} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
                </div>
                
                <div class="hidden duration-200 ease-linear" data-carousel-item>
                    <img src={cat2} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
                </div>
                
                <div class="hidden duration-200 ease-linear" data-carousel-item="active">
                    <img src={cat3} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
                </div>
                
                <div class="hidden duration-200 ease-linear" data-carousel-item>
                    <img src={cat4} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
                </div>
            
                <div class="hidden duration-200 ease-linear" data-carousel-item>
                    <img src={cat5} class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."></img>
                </div>
            </div>
        
            <button type="button" class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
                    <span class="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span class="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span class="sr-only">Next</span>
                </span>
            </button>
    </div>
  )
}

export default Carousel