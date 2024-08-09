import React from 'react'
import { useParams } from 'react-router-dom'
import { ParentProfile } from './parentProfile'
import { KidProfile } from './kidProfile'
import { MentorProfile } from './MentorProfile'

export const UserProfile = () => {
  const { id } = useParams()
  
  const renderProfile = () =>{
    switch(id){
      case 'parent1':
        return <ParentProfile id = {id}/>
        break;
      case 'mentor1':
        return <MentorProfile id = {id}/>
        break;
      case 'kid1':
        return <KidProfile id = {id}/>
        break;
    }
  }

  return <>{renderProfile()}</>

}