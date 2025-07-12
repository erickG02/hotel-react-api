import { useState } from 'react'
import './App.css'
import { BrowserRouter, Link } from 'react-router-dom'
import AccommodationsList from './components/Accommodations/AccommodationsList'
import Rutas from './routes/Rutas'


function App() {
  

  return (
   <BrowserRouter>
    <Rutas />

    <Link to={`/accomodations`} >Alojamientos</Link>
    
    
    </BrowserRouter>
  )
}

export default App
