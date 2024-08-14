import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../../api/axiosConfig";
import "./createGroup.css";

const CreateGroup = () => {
  const [formateurOptions, setFormateurOptions] = useState([]);
  const [enfantOptions, setEnfantOptions] = useState([]);
  const [selectedEnfants, setSelectedEnfants] = useState([]);
  const [groupData, setGroupData] = useState({
    nom: "",
    trancheAge: "",
    description: "",
    formateur_id: "",
    enfants_id: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        
        if (response.data && Array.isArray(response.data.users)) {
          const { users } = response.data;

          const formateurs = users.filter((user) => user.role === "Formateur");
          setFormateurOptions(
            formateurs.map((formateur) => ({
              value: formateur._id,
              label: `${formateur.nom} ${formateur.prenom}`,
            }))
          );

          const enfants = users.filter((user) => user.role === "Enfant");
          setEnfantOptions(
            enfants.map((enfant) => ({
              value: enfant._id,
              label: `${enfant.nom} ${enfant.prenom}`,
            }))
          );
        } else {
          console.error("Unexpected API response structure:", response.data);
          setError("Unexpected API response structure.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users.");
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectFormateurChange = (selectedOption) => {
    setGroupData((prevData) => ({
      ...prevData,
      formateur_id: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSelectEnfantChange = (selectedOptions) => {
    setSelectedEnfants(selectedOptions);
    setGroupData((prevData) => ({
      ...prevData,
      enfants_id: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("/groupes", groupData);
      if (response.data.success) {
        setSuccessMessage("Group created successfully!");
        setGroupData({
          nom: "",
          trancheAge: "",
          description: "",
          formateur_id: "",
          enfants_id: [],
        });
        setSelectedEnfants([]);
      }
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Error creating group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin</label>
      <label className="nav-label2">Groupes &gt; Créer Groupe</label>
      <div className="view-wrapper create-group-wrapper">
        <form onSubmit={handleSubmit}>
          <span className="page-title">Créer un Groupe</span>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <div className="group-info-input-group">
            <div className="group-info-wrapper">
              <label className="group-info-label">Nom du groupe</label>
              <input
                type="text"
                className="group-info-input"
                name="nom"
                value={groupData.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="group-info-wrapper">
              <label className="group-info-label">Formateur</label>
              <Select
                options={formateurOptions}
                placeholder="Sélectionner..."
                onChange={handleSelectFormateurChange}
                value={formateurOptions.find(option => option.value === groupData.formateur_id)}
                required
              />
            </div>
            <div className="group-info-wrapper">
              <label className="group-info-label">Enfants</label>
              <Select
                options={enfantOptions}
                isMulti
                placeholder="Sélectionner des enfants..."
                onChange={handleSelectEnfantChange}
                value={enfantOptions.filter(option => groupData.enfants_id.includes(option.value))}
              />
            </div>
          </div>
          <div className="group-info-input-group">
            <div className="group-info-wrapper">
              <label className="group-info-label">Tranche d'âge</label>
              <input
                type="text"
                className="group-info-input"
                name="trancheAge"
                value={groupData.trancheAge}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="group-info-wrapper">
            <label className="group-info-label">Description</label>
            <textarea
              className="group-info-input"
              name="description"
              value={groupData.description}
              onChange={handleInputChange}
            />
          </div>
          <button className="save-group-btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
