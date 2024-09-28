// src/components/Navbar/SearchResults.jsx
import React from 'react';
import './SearchResults.css'; // Optional: Add styles for the results
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SearchResults = ({ results }) => {
  const navigate = useNavigate();

  return (
    <div className="search-results">
      {results.length > 0 ? (
        results.map(user => (
          <div 
            key={user.id} 
            className="search-result-item" 
            onClick={() => navigate(`/profile/${user.id}`)} // Navigate to user profile
          >
            <p>{user.nom} - {user.email} - {user.role}</p>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
