
import { useState } from 'react'
import './App.css'
import Brands from './components/Brands'
import Navbar from './components/Navbar'
import Categories from './Pages/Categories'
import CTA from './Pages/CTA'
import Features from './Pages/Features'
import Hero from './Pages/Hero'
import Products from './Pages/Products'
import Footer from './Pages/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Products />
      <Features />
      <CTA />
      <Brands />
      <Footer />
    </>
  )
}

export default App
