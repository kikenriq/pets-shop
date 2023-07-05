import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Categories from './Pages/Categories'
import Hero from './Pages/Hero'
import Items from './Pages/Items'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <Items />
    </>
  )
}

export default App
