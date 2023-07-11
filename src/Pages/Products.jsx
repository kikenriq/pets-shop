import React from 'react'
import Prod1 from '../assets/images/product-1.jpg'
import Prod2 from '../assets/images/product-2.jpg'
import Prod3 from '../assets/images/product-3.jpg'
import Prod4 from '../assets/images/product-4.jpg'
import Prod5 from '../assets/images/product-5.jpg'
import Prod6 from '../assets/images/product-6.jpg'
import Prod7 from '../assets/images/product-7.jpg'
import Items from '../components/Items'

function Products() {
  return (
    <div className='flex flex-col justify-center'>
        <h1 className='text-3xl text-center gap-2 font-bold'><span className='text-orange-500'>Best</span>Seller</h1>

        <div>
            <div className=' grid gap-10 grid-cols-1 md:grid-cols-4 pt-10'>
                <Items
                image={Prod1}
                name='Commodo leo sed porta'
                price='$15.00' 
                />
                <Items
                image={Prod2}
                name='Purus consequat congue sit'
                price='$45.00' 
                />
                <Items
                image={Prod3}
                name='Morbi vel arcu scelerisque'
                price='$55.00' 
                />
                <Items
                image={Prod4}
                name='Morbi vel arcu scelerisque'
                price='$15.00' 
                />
                <Items
                image={Prod5}
                name='Commodo leo sed porta'
                price='$49.00' 
                />
                <Items
                image={Prod6}
                name='Nam justo libero porta ege'
                price='$85.00' 
                />
                <Items
                image={Prod7}
                name='Commodo leo sed porta'
                price='$15.00' 
                />

            </div>
        </div>
    </div>
  )
}

export default Products