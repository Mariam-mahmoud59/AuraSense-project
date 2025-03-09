import React from 'react'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import { Outlet } from 'react-router-dom'


export default function Layout() {

	return <>

		  <Navbar />
      
			<Outlet></Outlet>

	

	</>
}
