import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'


const App = () => {
  return (
    <BrowserRouter>
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
