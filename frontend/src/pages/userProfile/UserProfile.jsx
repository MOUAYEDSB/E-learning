import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParentProfile } from './parentProfile';
import { KidProfile } from './kidProfile';
import { MentorProfile } from './MentorProfile';
import { UserContext } from '../../context/userContext';

export const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from URL params
  const { getUser } = useContext(UserContext); // Get the getUser function from context
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userr = await getUser(id); // Await the getUser call
       
        setUser(userr); // Set the fetched user data to state
      } catch (error) {
        console.error('Error fetching user:', error); // Handle any errors
      }
    };

    fetchUser(); // Call the async function to fetch the user
  }, []);

  const renderProfile = () => {
    
    if (user.role) {
      switch (user.role.toLowerCase()) {
        case 'parent':
          return <ParentProfile id={id} />;
        case 'formateur':
          return <MentorProfile id={id} />;
        case 'enfant':
          return <KidProfile id={id} />;
        default:
          return <div>Undefined role</div>; // Handle unknown roles
      }
    } else {
      return <div>User not found</div>; // Display message when user is not found
    }
  };

  return <>{renderProfile()}</>;
};
