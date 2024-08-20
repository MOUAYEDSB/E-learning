import "./usersList.css";
import React, { useContext } from "react";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import { UserContext } from "../../context/userContext";

export const UsersList = ({ role }) => {
  const { users, setUsers } = useContext(UserContext);

  // Common columns for all roles
  const commonColumns = [
    {
      field: "profileImgURL",
      headerName: "Image",
      type: "image",
      width: 100,
      headerClassName: "header-column",
    },
    {
      field: "prenom",
      headerName: "Prénom",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
    {
      field: "nom",
      headerName: "Nom",
      type: "text",
      width: 200,
      headerClassName: "header-column",
    },
    {
      field: "email",
      headerName: "Adresse E-mail",
      type: "text",
      width: 280,
      headerClassName: "header-column",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 130,
      headerClassName: "header-column",
    },
  ];

  // Conditional columns based on the role
  const columns =
    role === "parent"
      ? [
          ...commonColumns,
          {
            field: "adresse",
            headerName: "Adresse",
            type: "text",
            width: 300,
            headerClassName: "header-column",
          },
          {
            field: "telephone",
            headerName: "Numéro de Téléphone",
            type: "text",
            width: 150,
            headerClassName: "header-column",
          },
        ]
      : role === "enfant"
      ? [
          ...commonColumns,
          {
            field: "systemeScolaire",
            headerName: "Système Scolaire",
            type: "text",
            width: 200,
            headerClassName: "header-column",
          },
        ]
      : role === "formateur"
      ? [
          ...commonColumns,
          {
            field: "titre",
            headerName: "Titre",
            type: "text",
            width: 200,
            headerClassName: "header-column",
          },
          {
            field: "adresse",
            headerName: "Adresse",
            type: "text",
            width: 170,
            headerClassName: "header-column",
          },

          {
            field: "bio",
            headerName: "Bio",
            type: "text",
            width: 400,
            headerClassName: "header-column",
          },

        ]
      : [];

  return (
    <div className="container">
      <label className="nav-label">Pages / Espace Admin</label>
      <label className="nav-label2">Liste d’utilisateurs &gt; {role}s</label>
      <div className="view-wrapper">
        <span className="page-title">Liste des {role}s</span>
        <DataGrid
          role={role}
          columns={columns}
          items={users.filter(
            (user) => user.role && user.role.toLowerCase() === role
          )}
          setItems={setUsers}
          maxHeight="500px"
        />
      </div>
    </div>
  );
};
