import './App.css'
import { Routes, Route} from 'react-router-dom'
import React from 'react'
import ParentProfile from './pages/userProfile/parentProfile'


function App() {
  

  return (
    <>
      <Routes>
        {/* to test your component here */}
        <Route path="/" element={<ParentProfile />} />
      </Routes>
    </>
  )
}

export default App
