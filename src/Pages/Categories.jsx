import React from 'react'
import Cards from '../components/Cards'
import Carousel from '../components/Carousel'


const Categories = () => {
  return (
    <div className='relative w-full md:px-16'>
      <Carousel />
      <Cards />
    </div>
  )
}

export default Categories