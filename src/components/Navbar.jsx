import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <div className=" gap-5 w-full bg-gray-800 p-2 flex  justify-center items-center fixed top-0 left-0 shadow-md">
   <NavLink 
   to="/" >
    Home
   </NavLink>

   <NavLink
     to="/pastes">
    Paste
   </NavLink>
   </div>
  )
}

export default Navbar
