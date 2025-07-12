import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccommodationsEdit from "../components/Accommodations/AccommodationsEdit";
import AccommodatonsForm from "../components/Accommodations/AccommodatonsForm";
import AccommodationsList from "../components/Accommodations/AccommodationsList";

import React from 'react'

export default function Rutas() {
  return (
    <div>
        
<Routes>
    <Route path='/accomodations' element={<AccommodationsList></AccommodationsList>}></Route>
    <Route path="/edit/:accommodationId" element={<AccommodationsEdit />} />
    <Route path="/accommodations/create" element={<AccommodatonsForm />} />
</Routes>

    </div>
  )
}



