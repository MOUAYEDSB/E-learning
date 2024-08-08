import React, { useState } from "react";
import "../userProfile/userProfile.css";
import { assets } from "../../assets/assets.js";

const CreateUser = () => {
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    adresse: "",
    age: "",
    children: [],
    titre:"",
    bio:""
  });
  const [image,setImage] = useState(false);
  const [userType, setUserType] = useState("");
  const changeHandler = (e) => {
    const { name, value } = e.target;
    const nameParts = name.split("-");

    if (nameParts.length === 1) {
      // Simple property
      setFormValues({
        ...formValues,
        [name]: value,
      });
    } else if (nameParts[0] === "child") {
      // Children property
      const index = parseInt(nameParts[1]);
      const key = nameParts[2];
      const updatedChildren = formValues.children.map((child, i) =>
        i === index ? { ...child, [key]: value } : child
      );
      setFormValues({
        ...formValues,
        children: updatedChildren,
      });
    } else {
      // Nested property
      const [parent, key] = nameParts;
      setFormValues({
        ...formValues,
        [parent]: {
          ...formValues[parent],
          [key]: value,
        },
      });
    }

    console.log(formValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const addChild = () => {
    setFormValues({
      ...formValues,
      children: [
        ...formValues.children,
        { nom: "", prenom: "", age: "", educationSystem: "" },
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
      <label className="nav-label">Pages / Espace Admin </label>
      <label className="nav-label2">Groupes / Creer Groupe</label>
      <div className="create-user-profile">
        <h3>Créer un compte</h3>
        <form onSubmit={submitHandler}>
          <div className="userProfile-image-container">
            <div className="user-image">
              <img src={image?URL.createObjectURL(image) :assets.defaultProfileImage} alt="" />
              <input type="file" name="profileImage" onChange={(e)=>setImage(e.target.files[0])}/>
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
              <label>Prenom</label>
              <input
                type="text"
                name="prenom"
                value={formValues.prenom}
                placeholder="Prenom"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              placeholder="Email"
              onChange={changeHandler}
            />
          </div>
          <div className="cell">
            <div className="input-box">
              <label>Telephone</label>
              <input
                type="text"
                name="tel"
                value={formValues.tel}
                placeholder="Telephone"
                onChange={changeHandler}
              />
            </div>
            <div className="input-box">
              <label>Adresse</label>
              <input
                type="text"
                name="adresse"
                value={formValues.adresse}
                placeholder="Votre adresse"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="cell">
            <div className="input-box">
              <label>Age</label>
              <input
                type="text"
                name="age"
                value={formValues.age}
                placeholder="Votre age"
                onChange={changeHandler}
              />
            </div>
            <div className="input-box">
              <label>Type d'utilisateur</label>
              <select
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Sélectionner</option>
                <option value="formateur">Formateur</option>
                <option value="parent">parent</option>
              </select>
            </div>
          </div>
          <hr />
          {userType === "parent" ? (
            <>
              {/* -------------------  Children Section -------------------------*/}
              <h4>Enfants</h4>
              {formValues.children.map((child, index) => (
                <div key={index} className="child-section">
                  <h5 className="child-header">Enfant {index + 1}</h5>
                  <div className="cell">
                    <div className="input-box">
                      <label>Nom</label>
                      <input
                        type="text"
                        name={`child-${index}-nom`}
                        value={child.nom}
                        placeholder="Nom"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="input-box">
                      <label>Prenom</label>
                      <input
                        type="text"
                        name={`child-${index}-prenom`}
                        value={child.prenom}
                        placeholder="Prenom"
                        onChange={changeHandler}
                      />
                    </div>
                  </div>
                  <div className="cell">
                    <div className="input-box">
                      <label>Age</label>
                      <input
                        type="text"
                        name={`child-${index}-age`}
                        value={child.age}
                        placeholder="Age"
                        onChange={changeHandler}
                      />
                    </div>
                    <div className="input-box">
                      <label>Systéme educatif</label>
                      <select
                        name={`child-${index}-educationSystem`}
                        value={child.educationSystem}
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
                      name={`child-${index}-email`}
                      value={child.email}
                      placeholder="child email"
                      onChange={changeHandler}
                    />
                  </div>
                  <button
                    className="submit-btn"
                    type="button"
                    onClick={() => removeChild(index)}
                  >
                    Remove Child
                  </button>
                  <hr />
                </div>
              ))}
              <button type="button" className="submit-btn" onClick={addChild}>
                Add Child
              </button>
            </>
          ) : (
            <>
              {/* -------------------  Formateur Section -------------------------*/}
              <div className="input-box">
                <label>Titre</label>
                <input
                  type="text"
                  name="titre"
                  value={formValues.titre}
                  placeholder="Titre"
                  onChange={changeHandler}
                />
              </div>
              <div className="input-box">
                <label>Bio</label>
                <textarea
                  type="text"
                  name="bio"
                  rows={5}
                  cols={30}
                  value={formValues.bio}
                  placeholder="Bio"
                  onChange={changeHandler}
                />
              </div>
            </>
          )}
          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
