import React, { useContext, useEffect, useState } from "react";
import "./userProfile.css";
import { UserContext } from "../../context/userContext.jsx";
import { assets } from "../../assets/assets"; // Assuming you have a default image asset

export const KidProfile = ({ id }) => {
  const { getUser, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(null); // Set initial state to null for loading state
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    age: "",
    systemeScolaire: "",
    profileImgURL: "", // Added for profile image
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // For image file
  const [imagePreview, setImagePreview] = useState(assets.defaultProfileImage); // Default image

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(id);
      if (fetchedUser) {
        setUser(fetchedUser);
        // Update form values with fetched user data
        setFormValues({
          nom: fetchedUser.nom || "",
          prenom: fetchedUser.prenom || "",
          email: fetchedUser.email || "",
          tel: fetchedUser.telephone || "",
          adresse: fetchedUser.adresse || "",
          age: fetchedUser.age || "",
          systemeScolaire: fetchedUser.systemeScolaire || "",
          profileImgURL: fetchedUser.profileImgURL || "",
        });
        setImagePreview(
          fetchedUser.profileImgURL
            ? `http://localhost:3000/${fetchedUser.profileImgURL}`
            : assets.defaultProfileImage
        ); // Default image if no profile picture
      }
    };

    fetchUser();
  }, [id, getUser]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Update preview when new file is selected
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form values to FormData
    Object.keys(formValues).forEach((key) => {
      formData.append(key, formValues[key]);
    });

    // Append the image file if selected
    if (selectedFile) {
      formData.set("profileImgURL", selectedFile);
    }

    try {
      const updatedUser = await updateUser(id, formData);
      if (updatedUser) {
        setUser(updatedUser); // Update user with the returned updated user
        setImagePreview(
          updatedUser.profileImgURL
            ? `http://localhost:3000/${updatedUser.profileImgURL}?${new Date().getTime()}`
            : assets.defaultProfileImage
        );
      }
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin </label>
      <label className="nav-label2">
        Profiles &gt; {user.nom + " " + user.prenom}
      </label>
      <div className="view-wrapper user-profile-wrapper">
        <div className="user-profile-image-container">
          <div className="user-image">
            <img
              src={imagePreview || assets.defaultProfileImage}
              alt="Profile"
            />
            <span>{user.nom + " " + user.prenom}</span>
          </div>
          <div className="choose-image-section">
            {isEditing && (
              <input
                type="file"
                name="profileImgURL"
                accept="image/*"
                onChange={handleFileChange}
              />
            )}
          </div>
        </div>
        <div className="userProfile-info">
          <h3>Paramètres du compte</h3>
          <form onSubmit={submitHandler}>
            <div className="cell">
              <div className="input-box">
                <label>Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="nom"
                    value={formValues.nom}
                    onChange={changeHandler}
                  />
                ) : (
                  <p>{user.nom}</p>
                )}
              </div>
              <div className="input-box">
                <label>Prenom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="prenom"
                    value={formValues.prenom}
                    onChange={changeHandler}
                  />
                ) : (
                  <p>{user.prenom}</p>
                )}
              </div>
            </div>
            <div className="input-box">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={changeHandler}
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div className="cell">
              <div className="input-box">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="age"
                    value={formValues.age}
                    onChange={changeHandler}
                  />
                ) : (
                  <p>{user.age}</p>
                )}
              </div>
              <div className="input-box">
                <label>Systéme educatif</label>
                {isEditing ? (
                  <select
                    name="systemeScolaire"
                    value={formValues.systemeScolaire}
                    onChange={changeHandler}
                  >
                    <option value="">Sélectionner</option>
                    <option value="Tunisien">Tunisien</option>
                    <option value="Canadien">Canadien</option>
                    <option value="Francais">Francais</option>
                  </select>
                ) : (
                  <p>{user.systemeScolaire}</p>
                )}
              </div>
            </div>
            <button
              type="button"
              className="submit-btn"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button type="submit" className="submit-btn">
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
