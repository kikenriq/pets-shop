import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Categories from './Pages/Categories'
import CTA from './Pages/CTA'
import Features from './Pages/Features'
import Hero from './Pages/Hero'
import Items from './Pages/Items'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Items />
      <Features />
      <CTA />
    </>
  )
}

export default App
