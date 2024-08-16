import "./usersList.css";
import React, { useState, useContext } from "react";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { UserContext } from "../../context/userContext";
export const UsersList = ({ role }) => {
  const { users, setUsers, addUser, updateUser, deleteUser } =
    useContext(UserContext);

  const label = { parent: "Parents", seed: "Graines", mentor: "Formateur" };
  const [selectedContent, setSelectedContent] = useState(0);

  const columns = [
    {
      field: "prenom",
      headerName: "Nom complet",
      type: "text",
      img: "profileImgURL",
      width: "100px",
      minWidth: "100px",
      sort: true,
    },
    {
      field: "email",
      headerName: "Adresse E-mail",
      type: "text",
      width: "250px",
      minWidth: "200px",
    },
    {
      field: "telephone",
      headerName: "Téléphone",
      type: "text",
      width: "180px",
      minWidth: "80px",
    },
    {
      field: "role",
      headerName: "Rôle",
      type: "text",
      width: "150px",
      minWidth: "90px",
      sort: true,
    },
    {
      field: "titre",
      headerName: "Titre",
      type: "text",
      width: "200px",
      minWidth: "150px",
      sort: true,
    },
    {
      field: "adresse",
      headerName: "Adresse",
      type: "text",
      width: "300px",
      minWidth: "180px",
    },
  ];

  // const columns = [
  //   { field: 'fullName', headerName: 'Nom', type : 'text', img: 'profilePicUrl', width: '250px', minWidth: '200px', sort: true, },
  //   { field: 'email', headerName: 'Adresse E-mail', type : 'text', width: '320px', minWidth: '250px'},
  //   { field: 'phone', headerName: 'Téléphone', type : 'text', width: '180px',minWidth: "120px"},
  //   { field: 'status', headerName: 'Status', type : 'status',options: {online: ['#d3efdf','#508d57'],offline: ['#f7ddd8','#b71d18']}, width: '110px',minWidth: '76px', sort: true},
  // ];

  

  return (
    <div className="container">
      <label className="nav-label">Pages / Espace Admin </label>
      <label className="nav-label2">Liste d’utilisateurs &gt; {role}s</label>
      <div className="view-wrapper">
        <span className="page-title">Listes des {role}s</span>
        <DataGrid role={role} columns={columns} items={users.filter((user) => user.role.toLowerCase() === role)} setItems={setUsers} maxHeight='500px'></DataGrid>
      </div>
    </div>
  );
};
