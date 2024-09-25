import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataGrid } from '../DataGrid/DataGrid';
import './UsersListView.css';

const UserListView = ({ title, role, columns, users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();

  // Calculate the current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users
    .filter((user) => user.role && user.role.toLowerCase() === role)
    .slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="view-wrapper" style={{ width: 905 }}>
      <span className="page-title">{title}</span>
      <DataGrid
        role={role}
        columns={columns}
        items={currentUsers}
        setItems={setUsers}
        maxHeight="500px"
      />
      <button
          onClick={() => navigate("/user/create")}
          type="submit" className="submit-btn" 
        >
          Ajouter
        </button>
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span style={{fontSize: 14}}>{`Page ${currentPage}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(users.length / usersPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserListView;
