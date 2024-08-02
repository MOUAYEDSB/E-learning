import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import CreateUser from  './pages/users/createUser'


function App() {

  return (
    <>
      <Routes>
        <Route path="/user" element={<CreateUser />} />
      </Routes>
    </>
  )
}

export default App
