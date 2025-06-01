import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className='max-w-screen-2xl mx-auto '>
    <nav>navbar</nav>
     <Outlet />
    </div>
  )
}

export default App

