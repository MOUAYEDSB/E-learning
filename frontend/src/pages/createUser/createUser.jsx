import React, { useState } from "react";
import axiosInstance from "../../api/axiosConfig.js";
import "./createUser.css";
import { assets } from "../../assets/assets.js";

export const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    age: "",
    motdepasse: "",
    titre: "",
    bio: "",
    children: [],
  });
  const [image, setImage] = useState(null);
  const [userType, setUserType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split("-");

    if (name === "role") {
      setUserType(value);
    } else if (nameParts.length === 1) {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else if (nameParts[0] === "children") {
      const index = parseInt(nameParts[1]);
      const key = nameParts[2];
      const updatedChildren = formValues.children.map((child, i) =>
        i === index ? { ...child, [key]: value } : child
      );
      setFormValues({
        ...formValues,
        children: updatedChildren,
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedbackMessage("");

    const formData = new FormData();
    formData.append("role", userType);

    // Append form fields
    Object.keys(formValues).forEach((key) => {
      if (key === "children") {
        formValues.children.forEach((child, index) => {
          Object.keys(child).forEach((field) => {
            formData.append(`children[${index}][${field}]`, child[field]);
          });
        });
      } else {
        formData.append(key, formValues[key]);
      }
    });

    if (image) {
      formData.append("profileImgURL", image);
    }

    try {
      const response = await axiosInstance.post("user/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User created successfully:", response.data);
      setFeedbackMessage(
        "User created successfully. Please check your email for the password."
      );
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data || error.message
      );
      setFeedbackMessage("Error creating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addChild = () => {
    setFormValues({
      ...formValues,
      children: [
        ...formValues.children,
        { nom: "", prenom: "", age: "", systemeScolaire: "", email: "" },
      ],
    });
  };

  const removeChild = (index) => {
    const updatedChildren = formValues.children.filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      children: updatedChildren,
    });
  };

  return (
    <div className="container">
      <label className="nav-label">Pages &gt; Espace Admin </label>
      <label className="nav-label2">Groupes &gt; Créer Un Compte</label>
      <div className="view-wrapper create-user-wrapper">
        <h3>Créer un compte</h3>
        <form onSubmit={submitHandler}>
          <div className="userProfile-image-container">
            <div className="user-image">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : assets.defaultProfileImage
                }
                alt=""
              />
              <input
                type="file"
                name="profileImage"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <div className="cell">
            <div className="input-box">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formValues.nom}
                onChange={changeHandler}
              />
            </div>
            <div className="input-box">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formValues.prenom}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={changeHandler}
            />
          </div>
          <div className="cell">
            <div className="input-box">
              <label>Téléphone</label>
              <input
                type="text"
                name="telephone"
                placeholder="Téléphone"
                value={formValues.telephone}
                onChange={changeHandler}
              />
            </div>
            <div className="input-box">
              <label>Adresse</label>
              <input
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={formValues.adresse}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="cell">
            <div className="input-box">
              <label>Âge</label>
              <input
                type="text"
                name="age"
                placeholder="Âge"
                value={formValues.age}
                onChange={changeHandler}
              />
            </div>
            <div className="input-box">
              <label>Type D'utilisateur</label>
              <select
                name="role"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Sélectionner</option>
                <option value="Formateur">Formateur</option>
                <option value="Parent">Parent</option>
              </select>
            </div>
          </div>
          <hr />
          {userType === "Parent" && (
            <>
              <h4>Enfants</h4>
              {formValues.children.map((child, index) => (
                <div key={index} className="child-section">
                  <h5 className="child-header">Enfant {index + 1}</h5>
                  <div className="cell">
                    <div className="input-box">
                      <label>Nom</label>
                      <input
                        type="text"
                        name={`children-${index}-nom`}
                        placeholder="Nom"
                        value={child.nom}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="input-box">
                      <label>Prénom</label>
                      <input
                        type="text"
                        name={`children-${index}-prenom`}
                        placeholder="Prénom"
                        value={child.prenom}
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="cell">
                    <div className="input-box">
                      <label>Âge</label>
                      <input
                        type="text"
                        name={`children-${index}-age`}
                        placeholder="Âge"
                        value={child.age}
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="input-box">
                      <label>Système éducatif</label>
                      <select
                        name={`children-${index}-systemeScolaire`}
                        value={child.systemeScolaire}
                        onChange={changeHandler}
                      >
                        <option value="">Sélectionner</option>
                        <option value="Tunisien">Tunisien</option>
                        <option value="Canadien">Canadien</option>
                        <option value="Francais">Francais</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-box">
                    <label>Email</label>
                    <input
                      type="email"
                      name={`children-${index}-email`}
                      placeholder="Email"
                      value={child.email}
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="input-box">
                    <label>Mot de passe</label>
                    <input
                      type="password"
                      name={`children-${index}-motdepasse`}
                      placeholder="Mot de passe"
                      value={child.motdepasse}
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    type="button"
                    className="submit-btn"
                    onClick={() => removeChild(index)}
                  >
                    Supprimer Enfant
                  </button>
                </div>
              ))}
              <button type="button" onClick={addChild} className="submit-btn">
                Ajouter Enfant
              </button>
            </>
          )}
          {userType === "Formateur" && (
            <>
              <div className="cell">
                <div className="input-box">
                  <label>Titre</label>
                  <input
                    type="text"
                    name="titre"
                    placeholder="Titre"
                    value={formValues.titre}
                    onChange={changeHandler}
                  />
                </div>
                <div className="input-box">
                  <label>Bio</label>
                  <input
                    type="text"
                    name="bio"
                    placeholder="Bio"
                    value={formValues.bio}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </>
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Enregistrement..." : "Créer Compte"}
          </button>
          {feedbackMessage && (
            <div className={`feedback ${loading ? "loading" : ""}`}>
              {feedbackMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
