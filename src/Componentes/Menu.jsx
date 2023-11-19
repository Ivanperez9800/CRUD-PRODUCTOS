import React from 'react'
import { Routes, Route } from "react-router-dom"
import Crear from './Crear'
import Editar from './Editar'

function Menu() {
  return (
    <div>
      <>Menu</>

    <Routes>
    <Route path="/" element={ <Crear /> } />
    <Route path="/editar/:id" element={<Editar />} />
    </Routes>
    </div>
  )
}

export default Menu