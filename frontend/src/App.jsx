import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/auth/login'
import Signup from './pages/auth/Signup'
const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" exact element={<Home />} />
    <Route path="/login" exact element={<Login />} />
    <Route path="/sign-up" exact element={<Signup />} />
    </Routes></BrowserRouter>
   </>
  )
}

export default App
