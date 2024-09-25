import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import Select from "react-select";
import axiosInstance from "../../api/axiosConfig";
import './groupInfo.css';

export const GroupInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formateurs, setFormateurs] = useState([]);
  const [enfants, setEnfants] = useState([]);
  const [selectedFormateur, setSelectedFormateur] = useState(null);
  const [selectedEnfants, setSelectedEnfants] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [groupData, setGroupData] = useState({
    nom: "",
    trancheAge: "",
    description: "",
    formateur_id: "",
    enfants_id: [],
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: "40px",
      borderColor: "#ccc",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  // Define the columns for the DataGrid, including new fields like email and systemeScolaire
  const columns = [
    { field: "profileImgURLkid", headerName: "Image", type: "image", width: 100, headerClassName: "header-column" },
    { field: 'nom', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { field: 'age', headerName: 'Âge', type: 'number', width: 110 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'systemeScolaire', headerName: 'Système Scolaire', width: 200 }
  ];

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axiosInstance.get(`/groupes/${id}`);
        if (response.data.success) {
          const group = response.data.groupe;

          const formateur = group.formateur_id
            ? {
              value: group.formateur_id._id,
              label: `${group.formateur_id.nom} ${group.formateur_id.prenom}`,
            }
            : null;

          const enfants = group.enfants_id
            ? group.enfants_id.map((enfant) => ({
              value: enfant._id,
              label: `${enfant.nom} ${enfant.prenom}`,
              nom: enfant.nom,
              prenom: enfant.prenom,
              age: enfant.age,
              email: enfant.email,
              systemeScolaire: enfant.systemeScolaire,
              profileImgURLkid: enfant.profileImgURLkid
            }))
            : [];

          setGroupData(group);
          setSelectedFormateur(formateur);
          setSelectedEnfants(enfants);
        } else {
          console.error("Error: API did not return a success status.");
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        if (response.data && Array.isArray(response.data.users)) {
          const formateurOptions = response.data.users
            .filter((user) => user.role === "Formateur")
            .map((formateur) => ({
              value: formateur._id,
              label: `${formateur.nom} ${formateur.prenom}`,
            }));
          setFormateurs(formateurOptions);

          const enfantOptions = response.data.users
            .filter((user) => user.role === "Enfant")
            .map((enfant) => ({
              value: enfant._id,
              label: `${enfant.nom} ${enfant.prenom} ${enfant.age}`,
              nom: enfant.nom,
              prenom: enfant.prenom,
              age: enfant.age,
              email: enfant.email,
              systemeScolaire: enfant.systemeScolaire,
              profileImgURLkid: enfant.profileImgURLkid,
            }));
          setEnfants(enfantOptions);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchGroupData();
    fetchUsers();
  }, [id]);

  const handleSelectFormateurChange = (selectedOption) => {
    setSelectedFormateur(selectedOption);
    setGroupData((prevGroupData) => ({
      ...prevGroupData,
      formateur_id: selectedOption.value,
    }));
  };

  const handleSelectEnfantChange = (selectedOptions) => {
    setSelectedEnfants(selectedOptions);
    setGroupData((prevGroupData) => ({
      ...prevGroupData,
      enfants_id: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedGroup = {
        ...groupData,
        formateur_id: selectedFormateur.value,
        enfants_id: selectedEnfants.map((enfant) => enfant.value),
      };

      await axiosInstance.put(`/groupes/${id}`, updatedGroup);
      setIsEdited(false);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axiosInstance.delete(`/groupes/${id}`);
      navigate("/groups"); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  // Filter to show only selected enfants
  const filteredEnfants = enfants.filter((enfant) =>
    selectedEnfants.some((selected) => selected.value === enfant.value)
  );

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin</label>
      <label className="nav-label2">Groupes &gt; {groupData.nom}</label>
      <div className="view-wrapper group-info-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="group-info-wrapper">
            <label className="group-info-label">Nom du groupe</label>
            <input
              type="text"
              className="group-info-input"
              value={groupData.nom}
              onChange={(e) => setGroupData({ ...groupData, nom: e.target.value })}
              disabled={!isEdited}
              required
            />
          </div>
          <div className="group-info-input-group">
            <div className="group-info-wrapper">
              <label className="group-info-label">Formateur</label>
              <Select
                options={formateurs}
                placeholder="Sélectionner..."
                onChange={handleSelectFormateurChange}
                value={selectedFormateur}
                isDisabled={!isEdited}
                styles={customStyles}
              />
            </div>

            <div className="group-info-wrapper">
              <label className="group-info-label">Enfants</label>
              <Select
                options={enfants}
                isMulti
                placeholder="Sélectionner des enfants..."
                onChange={handleSelectEnfantChange}
                value={selectedEnfants}
                isDisabled={!isEdited}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="group-info-wrapper">
            <label className="group-info-label">Tranche d'âge</label>
            <input
              type="text"
              className="group-info-input"
              value={groupData.trancheAge}
              onChange={(e) => setGroupData({ ...groupData, trancheAge: e.target.value })}
              disabled={!isEdited}
              required
            />
          </div>
          <div className="group-info-wrapper">
            <label className="group-info-label">Description</label>
            <textarea
              className="group-info-input"
              value={groupData.description}
              onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
              disabled={!isEdited}
            />
          </div>
          <button className="submit-btn" type="button" onClick={() => setIsEdited(!isEdited)}>
            {isEdited ? "Annuler" : "Modifier"}
          </button>
          {isEdited && <button type="submit" className="submit-btn">Enregistrer</button>}
          <button type="button" onClick={handleDeleteGroup} className="submit-btn">
            Supprimer le groupe
          </button>
        </form>

        <div className="view-wrapper">
          <span className="page-title">Listes des enfants sélectionnés</span>

          <DataGrid
            columns={columns}
            items={filteredEnfants}
            setItems={() => {}}
            maxHeight="500px" 
          />
        </div>

      </div>
    </div>
  );
};

export default GroupInfo;
