import React from 'react'

function Items(props) {
  return (
    <div>
        <figure className='flex flex-col align-middle items-center px-4'>
                    <img className='border-[1px] border-gray-200' src={props.image} alt="" />
                    <div className='flex flex-col text-center gap-1'>
                        <div className='flex flex-row gap-2 pt-5 justify-center'>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        <ion-icon name="star-outline"></ion-icon>
                        </div>
                        <h1 className=' text-xl hover:text-orange-400 text-black font-semibold'>{props.name}</h1>
                        <h3 className='text-2xl text-orange-400 font-bold'>{props.price}</h3>
                    </div>
                </figure>
    </div>
  )
}

export default Items