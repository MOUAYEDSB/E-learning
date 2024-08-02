import React, { useState } from 'react';
import './ListeParents.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListeParents = () => {
  const [users, setUsers] = useState([
    { nom: 'Doe', prenom: 'John', email: 'john.doe@example.com', adresse: '123 Main St', telephone: '123-456-7890', ProfileImgURL: '', age: 30 },
    { nom: 'Smith', prenom: 'Jane', email: 'jane.smith@example.com', adresse: '456 Oak St', telephone: '987-654-3210', ProfileImgURL: '', age: 28 },
    // Add more users as needed
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telephone.includes(searchTerm)
  );

  return (
    <div className="admin-users-list">
      <div className="container-1">
        <div className="group-37349">
          <p className="pages-admin-space">
            <span className="pages-admin-space-sub-25"></span><span className="pages-admin-space-sub-24"></span><span></span>
          </p>
          <span className="liste-dutilisateurs-1">
            Liste Des Parents
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="user-table">
          <div className="header">
            <span>Nom</span>
            <span>Prénom</span>
            <span>Email</span>
            <span>Adresse</span>
            <span>Téléphone</span>
            <span>Profile Image URL</span>
            <span>Age</span>
            <span>Actions</span>
          </div>
          {filteredUsers.map((user, index) => (
            <div className="row" key={index}>
              <div className="cell">
                <input
                  type="text"
                  value={user.nom}
                  onChange={(e) => handleInputChange(index, 'nom', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="text"
                  value={user.prenom}
                  onChange={(e) => handleInputChange(index, 'prenom', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="text"
                  value={user.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="text"
                  value={user.adresse}
                  onChange={(e) => handleInputChange(index, 'adresse', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="text"
                  value={user.telephone}
                  onChange={(e) => handleInputChange(index, 'telephone', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="text"
                  value={user.ProfileImgURL}
                  onChange={(e) => handleInputChange(index, 'ProfileImgURL', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <input
                  type="number"
                  value={user.age}
                  onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                  className="editable-input"
                />
              </div>
              <div className="cell">
                <button className="edit-button"><FaEdit /></button>
                <button className="delete-button"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeParents;
