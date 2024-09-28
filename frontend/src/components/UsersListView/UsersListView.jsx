import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '../DataGrid/DataGrid';
import './UsersListView.css';

const UserListView = ({ title, columns, users, setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const navigate = useNavigate();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Removed role filter

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
    <div className="view-wrapper" style={{ width: '%' }}>
      <span className="page-title">{title}</span>
      <DataGrid
        columns={columns}
        items={currentUsers}
        setItems={setUsers} // Ensure this is defined in Dashboard
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
