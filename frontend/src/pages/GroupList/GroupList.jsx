import "./groupList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axiosConfig";
import { GroupCard } from "../../components/Admin/GroupCard/GroupCard";
import { assets } from "../../assets/assets";

export const GroupList = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedContent, setSelectedContent] = useState(0);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Define a set of colors
  const colors = ["#30BCED", "#FFD237", "#F92A82",];

  useEffect(() => {
    console.log("Component mounted, fetching groups...");
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/groupes");
      console.log("Raw API Response:", response);
      if (response.data && Array.isArray(response.data.groupes)) {
        setGroups(response.data.groupes);
        console.log("Updated Groups State:", response.data.groupes);
      } else {
        console.error("Unexpected data structure:", response.data);
        setError("Unexpected data structure from API.");
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setError("Error fetching groups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Groups state has been updated:", groups);
  }, [groups]);

  return (
    <div className="container">
      <label className="group-list-title">
        {selectedContent === 0
          ? "Listes des groupes"
          : selectedContent === 1
          ? "Groupe 1 | 8-12 Ans"
          : "Ajouter un groupe"}
      </label>
      <div className="group-list-panel">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <Link to={`/group-info/${group._id}`} key={group._id}>
              <div>
                <GroupCard
                  groupName={group.nom}
                  groupAge={`${group.enfants_id.length} Membres | ${group.trancheAge}`}
                  color={colors[index % colors.length]} // Cycle through the colors array
                />
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No groups available.</p>
        )}
        <Link to="/add-group">
          <div className="add-group">
            <label className="group-name">Ajouter un groupe</label>
            <div className="group-image-border">
              <img className="group-card-icon" src={assets.PlusIcon} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
