import React from 'react'
import { useParams } from 'react-router-dom'
import { ParentProfile } from './ParentProfile'
import { KidProfile } from './KidProfile'
import { MentorProfile } from './MentorProfile'

export const UserProfile = () => {
  const { id } = useParams()
  
  const renderProfile = () =>{
    switch(id){
      case 'parent1':
        return <ParentProfile id = {id}/>
      case 'mentor1':
        return <MentorProfile id = {id}/>
        
      case 'kid1':
        return <KidProfile id = {id}/>
        
    }
  }

  return <>{renderProfile()}</>

}