import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Categories from './Pages/Categories'
import Hero from './Pages/Hero'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
    </>
  )
}

export default App
