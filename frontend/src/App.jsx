import './App.css'
import { Routes, Route} from 'react-router-dom'
import React from 'react'



function App() {
  

  return (
    <>
      <Routes>
        {/* to test your component import it and put it inside the element {<Example />} */}
        <Route path="/" element={<></>} />
      </Routes>
    </>
  )
}

export default App
