import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import { About, Contact, Dashboard, Login, Register } from './components/'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App