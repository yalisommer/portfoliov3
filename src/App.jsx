import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import SharkTracker from './pages/SharkTracker'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/shark-tracker" element={<SharkTracker />} />
    </Routes>
  )
}

export default App
