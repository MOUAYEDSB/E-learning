import "./messages.css"
import React, { useState } from 'react'

export default GroupList = () =>{
  const [selectedContent, setSelectedContent] = useState(0);
  return (
    
      <div className="group-list-body">
          <div className="group-list-container">
          </div>
      </div>
  )
}