import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Container from  './components/container/container.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path="/user" element={<Container />} />
      </Routes>
    </>
  )
}

export default App
