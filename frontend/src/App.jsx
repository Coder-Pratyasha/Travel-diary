import React from 'react'
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
   <>
   <HashRouter>
   <div className="min-h-screen bg-gradient-to-r from-cyan-100 to-sky-200">
   <Routes>
    <Route element={<PrivateRoute/>}>
        <Route path="/" exact element={<Home />} />
    </Route>
    
    <Route path="/login" exact element={<Login />} />
    <Route path="/sign-up" exact element={<Signup />} />
    </Routes>
    </div>
    </HashRouter>
   </>
  )
}

export default App
