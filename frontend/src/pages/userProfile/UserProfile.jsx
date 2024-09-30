import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ParentProfile } from './parentProfile';
import { KidProfile } from './kidProfile';
import { MentorProfile } from './MentorProfile';
import { UserContext } from '../../context/userContext';

export const UserProfile = () => {
  const { id } = useParams(); // Get the user ID from URL params
  const { getUser } = useContext(UserContext); // Get the getUser function from context
  const [user, setUser] = useState(null); // Initialize with null to represent loading state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(id); // Await the getUser call
        setUser(fetchedUser); // Set the fetched user data to state
      } catch (error) {
        console.error('Error fetching user:', error); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUser(); // Call the async function to fetch the user
  }, [id, getUser]); // Add id and getUser as dependencies

  const renderProfile = () => {
    // Return a loading indicator if user data is not yet available
    if (loading) {
      return <div>Loading...</div>;
    }

    // Handle case where no user is found
    if (!user || !user.role) {
      return <div>User not found or role is missing</div>;
    }

    // Render the appropriate profile based on the user's role
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
  };

  return <>{renderProfile()}</>;
};
