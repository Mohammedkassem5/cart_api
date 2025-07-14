import { useState } from 'react'
import HomePage from './Pages/HomePage'
import CartPage from './Pages/CartPage'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {


  return (
    <div className='col-12 app'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            
            
            <Route index element={<HomePage/>} />
            <Route path='cart' element={<CartPage/>} />
              
        
          
         
         
          </Route> 
      
        
        </Routes>
      
      </BrowserRouter>
  </div>
  )
}

export default App
